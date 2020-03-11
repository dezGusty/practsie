import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SurveyService } from '../shared/survey.service';
import { ReportsService } from '../shared/reports.service';
import { TableData } from '../shared/tabledata.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styles: ['']
})
export class DashComponent implements OnInit, OnDestroy {

  public reportData: TableData = new TableData();

  public useRotate = true;

  private subscriptions: Subscription[] = [];

  @ViewChild('reportTable', { static: false }) public reportTable: ElementRef;

  constructor(public reportSvc: ReportsService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.reportSvc.onReportReady.subscribe(
      (message: any) => {
        this.reportData = this.reportSvc.reportObj;
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  onGetReport() {
    this.reportSvc.triggerReportOfAllDocsAsync();
  }

  onGetDemoReport() {
    this.reportSvc.triggerDemoReportOfAllDocsAsync();
  }

  onSelectTable() {

    if (!this.reportTable) {
      return;
    }

    const el = this.reportTable.nativeElement;

    let range: Range;
    let sel: Selection;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
    }
  }
}
