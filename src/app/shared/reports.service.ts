import { Injectable, EventEmitter } from '@angular/core';
import { TableData, TableRow } from './tabledata.model';
import { AnswerSerialization } from './answerserialization.model';
import { SurveyService } from './survey.service';
import { Survey } from './survey.model';
import { SurveyQuestion } from './surveyquestion.model';
import { SettingsService } from './settings.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
const surveyConfig = require('./surveyconfig.json').surveyConfig;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  public onReportReady: EventEmitter<string> = new EventEmitter<string>();
  private lastReportObj: TableData | undefined;

  constructor(
    private firestore: Firestore,
    private surveySvc: SurveyService,
    private settingsSvc: SettingsService) { }

  public getLatestReportObj(): TableData | undefined {
    return this.lastReportObj;
  }

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

    const reportObj: TableData = new TableData();

    const row1 = reportObj.addRow();
    cols.forEach(col => reportObj.addCell(row1, col, 'bla'));
    const row2 = reportObj.addRow();
    cols.forEach(col => reportObj.addCell(row2, col, 'bla'));
    this.lastReportObj = reportObj;
    this.onReportReady.emit('ready');
  }

  public async triggerReportOfAllDocsAsync() {
    const reportObj: TableData = new TableData();
    const collectionRef = collection(this.firestore, this.settingsSvc.getSurveyCollection());
    const docsSnap = await getDocs(collectionRef);
    docsSnap.forEach(
      myDoc => {
        const docData = myDoc.data();
        const row: TableRow = reportObj.addRow();
        const keys: string[] = Object.keys(docData);

        keys.sort();
        reportObj.addCell(row, 'id', myDoc.id);

        keys?.forEach(
          key => {
            const cellValue: AnswerSerialization = docData[key];
            if (cellValue.val) {
              reportObj.addCell(row, key, cellValue.val);
            } else {
              reportObj.addCell(row, key, '');
            }
          }
        );
      });

    reportObj.dump();
    this.lastReportObj = reportObj;
    this.onReportReady.emit('ready');
  }
}
