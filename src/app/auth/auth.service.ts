import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User, UserRoles } from '../shared/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AppStorage } from '../shared/app-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // -------------------- internals -----------------------------

  /**
   * Store the auth token for quick access.
   */
  private token: string;

  /**
   * Store a cache for the currently logged in user.
   * This means that all permission checks (E.g. is the current user a match organizer)
   * shall be performed on the data read at the login time. The user needs to log-in
   * again in order to read any updated permissions.
   */
  private cachedUser: User;

  /**
   * Use this event emitter to inform subscribers that a sign-in event took place or sign-out event
   * is about to take place.
   */
  public onSignInOut: EventEmitter<string> = new EventEmitter<string>();

  private subscription: Subscription;


  // -------------------- functionality -----------------------------

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private appStorage: AppStorage) { }

  /**
   * Perform the login into the application via Google.
   */
  doGoogleLogin(postNavi: { successRoute: string[] } = { successRoute: ['/'] }) {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          console.log('[firebase login]');

          this.issueTokenRetrieval();
          this.updateAndCacheUserAfterLogin(res.user);
          this.onSignInOut.emit('signin-done');
          console.log('[login] navigating to root');

          this.router.navigate(postNavi.successRoute);
          resolve(res);
        })
        .catch((error) => {
          // error.code;
          // error.message;
          // error.email
          // error.credential
          console.warn('error when logging in', error);
        });
    });
  }

  private issueTokenRetrieval() {
    if (!this.afAuth.auth || !this.afAuth.auth.currentUser) {
      return;
    }

    // Request the token. Store it when received.
    this.afAuth.auth.currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
        }
      ).catch((error) => {
        console.warn('[auth] Failed to retrieve token', error);
      });
  }

  updateAndCacheUserAfterLogin(authdata: firebase.User) {
    const userData = new User(authdata);
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
        this.appStorage.setAppStorageItem('roles', JSON.stringify(this.cachedUser.roles));
        if (this.appStorage.cacheUserData) {
          this.appStorage.setAppStorageItem('user', JSON.stringify(this.cachedUser));
        }
      } else {
        // New user. Create the user doc.
        const obj = { ...userData };
        console.log('User does not exist. Should create');
        this.db.doc('users/' + userPath).set(obj);
        this.cachedUser = obj;
        this.appStorage.setAppStorageItem('roles', JSON.stringify(this.cachedUser.roles));
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
    if (!this.cachedUser || !this.cachedUser.roles) {
      const storedValue = this.appStorage.getAppStorageItem('roles');
      if (!storedValue) {
        return this.doesRoleContainOrganizer(this.cachedUser.roles);
      }
      const roles: UserRoles = JSON.parse(storedValue);
      return this.doesRoleContainOrganizer(roles);
    }

    return this.doesRoleContainOrganizer(this.cachedUser.roles);
  }
}
