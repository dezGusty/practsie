import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, authState, browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';

import { Injectable, EventEmitter, Optional } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AppUser, UserRoles } from '../shared/app-user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { AppStorage } from '../shared/app-storage';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Use this event emitter to inform subscribers that a sign-in event took place or sign-out event
   * is about to take place.
   */
  public onSignInOut: EventEmitter<string> = new EventEmitter<string>();

  // -------------------- internals -----------------------------

  /**
   * Store the auth token for quick access.
   */
  private token: string = null;

  /**
   * Store a cache for the currently logged in user.
   * This means that all permission checks (E.g. is the current user a match organizer)
   * shall be performed on the data read at the login time. The user needs to log-in
   * again in order to read any updated permissions.
   */
  private cachedUser: AppUser | null = null;

  private subscription: Subscription;

  // -------------------- functionality -----------------------------

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: Firestore,
    @Optional() private auth: Auth,
    private db: AngularFirestore,
    private appStorage: AppStorage) { }

  /**
   * Perform the login into the application via Google.
   *
   * @param postNavi: navigation route to be applied upon a successful log-in.
   * It consists of an array of strings. Defaults to : ['/'].
   * To avoid any redirect upon log-in, set this to an empty array:
   * @example
   * // login without redirect
   * doGoogleLogin({ successRoute: [] });
   * @example
   * // login with default redirect to root.
   * doGoogleLogin();
   * @example
   * // login with default redirect to /base.
   * doGoogleLogin({ successRoute: ['base'] });
   */
  doGoogleLogin(postNavi: { successRoute: string[] } = { successRoute: ['/'] }) {
    return new Promise<any>((resolve, reject) => {

      signInWithPopup(this.auth,
        new GoogleAuthProvider(),
        browserPopupRedirectResolver).then((res) => {
          // Success
          this.issueTokenRetrieval();
          this.updateAndCacheUserAfterLogin(res.user);
          this.onSignInOut.emit('signin-done');
          if (postNavi?.successRoute?.length > 0) {
            console.log('[login] navigating to route ', postNavi.successRoute);
            this.router.navigate(postNavi.successRoute);
          }
          resolve(res);
        }, (error) => {
          // Error handling
          console.warn('error when logging in', error);
        });
    });
  }

  public async doGoogleLoginAsync(postNavi: { successRoute: string[] } = { successRoute: ['/'] }): Promise<boolean> {
    console.log('doGoogleLoginAsync entered');

    const userCred = await signInWithPopup(
      this.auth,
      new GoogleAuthProvider());
    console.log('userCred', userCred);
    if (userCred) {
      this.issueTokenRetrieval();
      this.updateAndCacheUserAfterLogin(userCred.user);
      this.onSignInOut.emit('signin-done');
      if (postNavi?.successRoute?.length > 0) {
        console.log('[login] navigating to route ', postNavi.successRoute);
        this.router.navigate(postNavi.successRoute);
      }
      return true;
    }
    return false;
  }


  updateAndCacheUserAfterLogin(authdata: User) {
    const userData = new AppUser(authdata);
    const userPath = authdata.uid;
    const userRef = this.db.doc('users/' + userPath).get();

    this.subscription = userRef.subscribe(user => {
      if (user.exists) {
        // existing user. read the roles.
        const originalObj: UserRoles = user.get('roles');
        if (originalObj) {
          userData.roles = originalObj;
        } else {
          console.log('User does not have role. Should create');
        }
        const obj = { ...userData };
        if (!originalObj || !originalObj.standard) {
          // no permission property stored initially.
          // store something.
          console.log('[auth] storing user permissions');

          this.db.doc('users/' + userPath).set(obj, { merge: true });
        }
        this.cachedUser = obj;
        this.appStorage.setAppStorageItem('roles', JSON.stringify(this.cachedUser?.roles));
        if (this.appStorage.cacheUserData) {
          this.appStorage.setAppStorageItem('user', JSON.stringify(this.cachedUser));
        }
      } else {
        // New user. Create the user doc.
        const obj = { ...userData };
        console.log('[auth] User does not exist. Should create');
        this.db.doc('users/' + userPath).set(obj);
        this.cachedUser = obj;
        this.appStorage.setAppStorageItem('roles', JSON.stringify(this.cachedUser?.roles));
        if (this.appStorage.cacheUserData) {
          this.appStorage.setAppStorageItem('user', JSON.stringify(this.cachedUser));
        }
      }
    });
  }

  public isAuthenticated(): boolean {
    const result = (this.token !== null);
    return result;
  }

  public doesRoleContainOrganizer(role: UserRoles) {
    if (role && role.organizer) {
      return role.organizer;
    }
    return false;
  }

  isAuthenticatedAsOrganizer(): boolean {
    if (!this.cachedUser || !this.cachedUser?.roles) {
      const storedValue = this.appStorage.getAppStorageItem('roles');
      if (!storedValue) {
        return this.doesRoleContainOrganizer(this.cachedUser?.roles);
      }
      const roles: UserRoles = JSON.parse(storedValue);
      return this.doesRoleContainOrganizer(roles);
    }

    return this.doesRoleContainOrganizer(this.cachedUser?.roles);
  }

  private issueTokenRetrieval() {
    if (!this.afAuth || !this.afAuth.currentUser) {
      return;
    }

    // Request the token. Store it when received.
    this.afAuth.currentUser
      .then(
        (usr: firebase.User) => {
          this.token = usr.uid;
        }
      ).catch((error) => {
        console.warn('[auth] Failed to retrieve token', error);
      });
  }
}
