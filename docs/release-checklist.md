# Release checklist

This is a quick list of steps to be performed when performing a new release.

- [ ] increment version number in any documents
- [ ] update changes / history / readme file
- [ ] build the project
  - `ng build --configuration production`
- [ ] deploy to firebase
  - `firebase deploy --only hosting`
