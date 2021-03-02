import { Injectable, EventEmitter } from '@angular/core';
import { TableData, TableRow } from './tabledata.model';
import { AnswerSerialization } from './answerserialization.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { surveyConfig } from './surveyconfig.json';
import { SurveyService } from './survey.service';
import { Survey } from './survey.model';
import { SurveyQuestion } from './surveyquestion.model';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  public reportObj: TableData;

  public onReportReady: EventEmitter<string> = new EventEmitter<string>();


  constructor(private db: AngularFirestore, private surveySvc: SurveyService, private settingsSvc: SettingsService) { }

  public triggerDemoReportOfAllDocsAsync() {

    // Create the list of columns for the report.
    // These are based on the question headlines from the survey.
    // E.g.
    // const cols = ['id', 'C#',
    //   'C/C++', 'An de studiu', 'Electronică', 'Electronică - proiecte personale',
    //   'Electronică - repository personal', 'Embedded - proiecte personale',
    //   'Embedded - repository personal', 'Embedded/Firmware',
    //   'Facultate / Departament', 'Java', 'Linux',
    //   'Linux - proiecte personale', 'Linux - repository personal',
    //   'Preferință domeniu 1', 'Preferință domeniu 2', 'Preferință domeniu 3',
    //   'SQL / DB', 'Web development'];

    // Load the configuration
    const singleSurvey: Survey = this.surveySvc.makeSurveyFromData(surveyConfig);
    // Get the headlines
    const cols: string[] = singleSurvey.questions.map(
      (question: SurveyQuestion, index: number) => question.headline);

    this.reportObj = new TableData();

    const row1 = this.reportObj.addRow();
    cols.forEach(col => this.reportObj.addCell(row1, col, 'bla'));
    const row2 = this.reportObj.addRow();
    cols.forEach(col => this.reportObj.addCell(row2, col, 'bla'));
    this.onReportReady.emit('ready');
  }

  public triggerReportOfAllDocsAsync() {
    this.reportObj = new TableData();
    this.db.collection(this.settingsSvc.getSurveyCollection()).get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        const docData = doc.data();

        console.log(doc.id, ' => ', docData);

        const row: TableRow = this.reportObj.addRow();
        const keys: string[] = Object.keys(docData);

        this.reportObj.addCell(row, 'id', doc.id);

        keys?.forEach(
          key => {
            const cellValue: AnswerSerialization = docData[key];
            if (cellValue.val) {
              this.reportObj.addCell(row, key, cellValue.val);
            } else {
              this.reportObj.addCell(row, key, '');
            }
          }
        );
      });

      this.reportObj.dump();
      this.onReportReady.emit('ready');
    });
  }
}
