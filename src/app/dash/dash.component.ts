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

  @ViewChild('reportTable', { static: false }) public reportTable: ElementRef | undefined;

  public reportData: TableData | undefined = new TableData();

  public useRotate = true;

  private subscriptions: Subscription[] = [];

  constructor(public reportSvc: ReportsService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.reportSvc.onReportReady.subscribe(
      (message: any) => {
        this.reportData = this.reportSvc.getLatestReportObj();
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  async onGetReport() {
    await this.reportSvc.triggerReportOfAllDocsAsync();
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
    let sel: Selection | null;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      if (!sel) {
        return;
      }
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
