import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { DashboardSeviceService } from '../../dashboard-sevice.service';
import { FormatNumberPipe } from '../../format-number.pipe';
import { forwardRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-modern',
  standalone: true,
  imports: [
    NgxEchartsDirective,
    CommonModule,
    FormatNumberPipe,
    forwardRef(() => AnimatedNumberComponent),
],
  templateUrl: './dashboard-modern.component.html',
  styleUrl: './dashboard-modern.component.css',
})
export class DashboardModernComponent implements OnInit, OnChanges {
  chartData1: any;
  chartData2: any;
  chartData3: any;
  chartData4: any;
  chartData5: any;
  chartData6: any;

  activeTab: string = 'invoice';

  /* Extras */
  carousel_Qty: number = 0;
  carousel_Gross: number = 0;
  carousel_Net: number = 0;

  Qty_diff: number = 0;
  Gross_diff: number = 0;
  Net_diff: number = 0;

  /* Invoice */
  carousel_Party: number = 0;
  carousel_Invoices: number = 0;
  carousel_TotalValue: number = 0;
  carousel_TotalDiscount: number = 0;

  Parties_diff: number = 0;
  Invoices_diff: number = 0;
  InvoicesValue_diff: number = 0;
  Discount_diff: number = 0;

  /* Reconciliation */
  carousel_TotalFullMatches: number = 0;
  carousel_TotalPartialMatches: number = 0;
  carousel_Rejections: number = 0;
  carousel_ViolatingVendors: number = 0;
  carousel_CheckedInvoices: number = 0;

  CheckedInvoices_diff : number = 0
  FullMatches_diff: number = 0;
  PartialMatches_diff: number = 0;
  Rejections_diff: number = 0;
  ViolatingVendors_diff: number = 0;

  /* Reconciliation */
  // carousel_fails: number = 0;
  // carousel_: number = 0;
  // carousel_TotalValue: number = 0;
  // carousel_TotalDiscount: number = 0;
  // Parties_diff: number = 0;
  // Invoices_diff: number = 0;
  // InvoicesValue_diff: number = 0;
  // Discount_diff: number = 0;

  /* Chip Updater */
  chip_header_1: string = '';
  chip_header_2: string = '';
  chip_header_3: string = '';
  chip_header_4: string = '';

  chip_1_diff: number = 0;
  chip_2_diff: number = 0;
  chip_3_diff: number = 0;
  chip_4_diff: number = 0;

  carousel_1_diff: number = 0;
  carousel_2_diff: number = 0;
  carousel_3_diff: number = 0;
  carousel_4_diff: number = 0;

  /* Chart Updater */
  gridChart1!: EChartsCoreOption;
  gridChart2!: EChartsCoreOption;
  gridChart3!: EChartsCoreOption;
  gridChart4!: EChartsCoreOption;
  gridChart5!: EChartsCoreOption;
  gridChart6!: EChartsCoreOption;
  gridChart7!: EChartsCoreOption;
  gridChart8!: EChartsCoreOption;

  constructor(
    private http: HttpClient,
    private service: DashboardSeviceService
  ) {}

  // activeTab = 'tab1'; // default active tab
  ngOnInit() {
    this.loadData();
  }

  ngOnChanges() {
    this.setActiveTab(this.activeTab);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.setActiveData(this.activeTab);
  }

  setActiveData(tab: string) {
    console.log("setActiveData")
    switch (tab) {
      case 'invoice': {
        console.log('Active Tab: ' + this.activeTab);
        this.chip_header_1 = 'Vendors';
        this.chip_header_2 = 'Discount';
        this.chip_header_3 = 'Total Invoice Value';
        this.chip_header_4 = 'Total Invoices';

        this.chip_1_diff = this.Parties_diff;
        this.chip_2_diff = this.Discount_diff;
        this.chip_3_diff = this.InvoicesValue_diff;
        this.chip_4_diff = this.Invoices_diff;

        this.carousel_1_diff = this.carousel_Party;
        this.carousel_2_diff = this.carousel_TotalDiscount;
        this.carousel_3_diff = this.carousel_TotalValue;
        this.carousel_4_diff = this.carousel_Invoices;

        this.gridChart1 = this.chart1;
        this.gridChart2 = this.chartMap;
        this.gridChart3 = this.chart8;
        this.gridChart4 = this.chart9;
        this.gridChart5 = this.chart2;
        this.gridChart6 = this.chart4;
        this.gridChart7 = this.chart5;
        this.gridChart8 = this.chart6;

        console.log(this.carousel_1_diff)
        break;
      }
      case 'product': {
        console.log('Active Tab: ' + this.activeTab);
        break;
      }
      case 'purchase_order': {
        console.log('Active Tab: ' + this.activeTab);
        break;
      }
      case 'reconciliation': {
        console.log('Active Tab: ' + this.activeTab);

        this.chip_header_1 = 'Invoices Checked';
        this.chip_header_2 = 'Full Matches';
        this.chip_header_3 = 'Rejections';
        this.chip_header_4 = 'Violating Vendors';

        this.chip_1_diff = this.CheckedInvoices_diff;
        this.chip_2_diff = this.FullMatches_diff;
        this.chip_3_diff = this.Rejections_diff;
        this.chip_4_diff = this.ViolatingVendors_diff;

        this.carousel_1_diff = this.carousel_CheckedInvoices;
        this.carousel_2_diff = this.carousel_TotalFullMatches;
        this.carousel_3_diff = this.carousel_Rejections;
        this.carousel_4_diff = this.carousel_ViolatingVendors;

        this.gridChart1 = this.chart10;
        this.gridChart2 = this.chartMap;
        this.gridChart3 = this.chart11;
        this.gridChart4 = this.chart12;
        this.gridChart5 = this.chart13;
        this.gridChart6 = this.chart14;
        this.gridChart7 = this.chart15;
        this.gridChart8 = this.chart16;

        break;
      }
      case 'vendor': {
        break;
      }
      // default: {
      //   this.chip_1_diff = this.Parties_diff;
      //   this.chip_2_diff = this.Discount_diff;
      //   this.chip_3_diff = this.InvoicesValue_diff;
      //   this.chip_4_diff = this.Invoices_diff;

      //   this.carousel_1_diff = this.carousel_Party;
      //   this.carousel_2_diff = this.carousel_TotalDiscount;
      //   this.carousel_3_diff = this.carousel_TotalValue;
      //   this.carousel_4_diff = this.carousel_Invoices;

      //   console.log("in default");
      // }
    }
  }

  //Dashboard Graphs

  chart1!: EChartsCoreOption;

  chart2!: EChartsCoreOption;

  chart3: EChartsCoreOption = {
    title: { text: 'Cost Breakdown by Taxes' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['CGST', 'SGST', 'IGST', 'CESS', 'GST'] },
    xAxis: {
      type: 'category',
      data: ['01/08/1999', '09/09/1990'],
    },
    yAxis: { type: 'value' },
    series: [
      // {
      //   name: 'CGST',
      //   data: [12, 34, 56],
      //   type: 'bar',
      // },
      // {
      //   name: 'SGST',
      //   data: [12, 34, 56],
      //   type: 'bar',
      // },
      // {
      //   name: 'IGST',
      //   data: [12, 34, 56],
      //   type: 'bar',
      // },
      // {
      //   name: 'CESS',
      //   data: [12, 34, 56],
      //   type: 'bar',
      // },
      // {
      //   name: 'GST',
      //   data: [12, 34, 56],
      //   type: 'bar',
      // },
      // {
      //   name: 'CGST',
      //   data: this.invoice_data.map((item: any) => Number(item.CGST)),
      //   type: 'bar',
      // },
      // {
      //   name: 'SGST',
      //   data: this.invoice_data.map((item: any) => Number(item.SGST)),
      //   type: 'bar',
      // },
      // {
      //   name: 'IGST',
      //   data: this.invoice_data.map((item: any) => Number(item.IGST)),
      //   type: 'bar',
      // },
      // {
      //   name: 'CESS',
      //   data: this.invoice_data.map((item: any) => Number(item.CESS)),
      //   type: 'bar',
      // },
      // {
      //   name: 'GST',
      //   data: this.invoice_data.map((item: any) => Number(item.GST_AMOUNT)),
      //   type: 'bar',
      // },
    ],
  };

  chart4!: EChartsCoreOption;

  chart5!: EChartsCoreOption;

  chart6!: EChartsCoreOption;

  chart7: EChartsCoreOption = {
    title: { text: 'Spend by Quarter' },
    xAxis: {
      type: 'category',
      data: ['Qtr 1', 'Qtr 2', 'Qtr 3', 'Qtr 4'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [100, 200, 400, 600, 700],
        type: 'bar',
      },
    ],
  };

  chart8!: EChartsCoreOption;

  chart9!: EChartsCoreOption;

  /* Reconciliation */
  chart10!: EChartsCoreOption;
  chart11!: EChartsCoreOption;
  chart12!: EChartsCoreOption;
  chart13!: EChartsCoreOption;
  chart14!: EChartsCoreOption;
  chart15!: EChartsCoreOption;
  chart16!: EChartsCoreOption;
  chart17!: EChartsCoreOption;
  chart18!: EChartsCoreOption;

  chartOptions = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      show: false,
      data: [0, 1, 2, 3, 4],
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'line',
        data: [10, 15, 8, 20, 16, 10, 15, 8, 20, 16, 10, 15, 8, 20, 16],
        stack: 'Total',
        smooth: false,
        lineStyle: {
          width: 1,
        },
        symbol: 'none',
        areaStyle: {}, // Optional: small area fill
      },
      {
        type: 'line',
        data: [10, 15, 8, 20, 16, 10, 15, 8, 20, 16, 10, 15, 8, 20, 16],
        stack: 'Total',
        smooth: false,
        lineStyle: {
          width: 1,
        },
        symbol: 'none',
        areaStyle: {}, // Optional: small area fill
      },
    ],
  };

  chartMap!: EChartsCoreOption;

  chartInstance: any;

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  loadData() {
    /* Invoices */
    this.service.getQuantityByBranch().subscribe((data: any) => {
      this.chartData1 = data;
      // console.log(data);
      // console.log(this.chartData1);

      var pieData = data
        .filter((item: any) => item.quantity != null) // Remove null/undefined
        .sort((a: any, b: any) => b.quantity - a.quantity) // Sort descending
        .slice(0, 5) // Take top 5
        .map((item: any) => ({
          name: item.branch,
          value: item.quantity,
        }));

      const sortedLegend = pieData.map((d: any) => d.name).sort();

      this.chart1 = {
        title: { text: 'Spend Breakdown by Branch' },
        tooltip: { trigger: 'item' },
        // legend: { top: '5%' },
        legend: {
          data: sortedLegend,
          top: '5%',
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            // data: data.map((item: any) => ({
            //   name: item.branch,
            //   value: item.quantity,
            // })),
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: pieData,
          },
        ],
      };
    });

    this.service.totalValuebyDate().subscribe((data: any) => {
      this.chartData2 = data;
      this.chart2 = {
        title: {
          text: 'Spend Trend Over Time',
        },
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 60, // Add space for Y-axis labels
          right: 20,
          top: 40,
          bottom: 40,
          containLabel: true, // Ensures labels stay inside canvas
        },
        xAxis: {
          type: 'category',
          data: data.map((item: any) => item.date),
          axisLabel: {
            rotate: 45, // Optional: rotate for better fit if dates overlap
            fontSize: 10,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.total_value),
            type: 'line',
            smooth: true,
          },
        ],
      };
    });

    this.service.grossAmtwithDiscount().subscribe((data: any) => {
      this.chartData4 = data;
      this.chart4 = {
        title: { text: 'Spend vs Discount and Gross Amount' },
        tooltip: { trigger: 'item' },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 60, // Add space for Y-axis labels
          right: 20,
          top: 40,
          bottom: 40,
          containLabel: true, // Ensures labels stay inside canvas
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
          /*, name: 'Gross_Amount' */
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          } /*, name: 'Discount' */,
        },
        series: [
          {
            type: 'scatter',
            data: data.map((item: any) => [item.gross_amt, item.discount]),
          },
        ],
      };
    });

    this.service.totalValuebyParty().subscribe((data: any) => {
      this.chartData5 = data;
      this.chart5 = {
        title: {
          text: 'Cost Breakdown by Party',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.party),
          axisLabel: {
            show: false,
            width: 20,
            rotate: 90, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        // series: [
        //   {
        //     name: 'Total Cost',
        //     data: data.map((item: any) => item.total_value),
        //     type: 'bar',
        //     itemStyle: {
        //       color: '#5470C6', // Customize bar color if needed
        //     },
        //     label: {
        //       show: true,
        //       position: 'top',
        //       fontSize: 10,
        //     },
        //   },
        // ],
        // yAxis: { type: 'value' },
        series: [
          {
            data: data.map((item: any) => item.total_value),
            type: 'bar',
          },
        ],
      };
    });

    this.service.top5VendorsByValue().subscribe((data: any) => {
      this.chart8 = {
        title: {
          text: 'Top 5 Vendors by Value',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.vendor),
          axisLabel: {
            show: true,
            width: 20,
            rotate: 45, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.tot),
            type: 'bar',
          },
        ],
      };
    });

    this.service.top5VendorsByInvoice().subscribe((data: any) => {
      this.chart9 = {
        title: {
          text: 'Top 5 Vendors by No. of Invoices',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.vendor),
          axisLabel: {
            show: true,
            width: 20,
            rotate: 45, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.invoices_cnt),
            type: 'bar',
          },
        ],
      };
    });

    this.service.totalValuebyYrQTR().subscribe((data: any) => {
      const xLabels = [...new Set(data.map((item: any) => item.qtr).sort())];
      const yLabels = [...new Set(data.map((item: any) => item.yr).sort())];
      this.chart6 = {
        title: { text: 'Spend by Quarter' },
        tooltip: {
          position: 'top',
        },
        grid: {
          height: '50%',
          top: '10%',
        },
        xAxis: {
          type: 'category',
          data: xLabels,
          splitArea: { show: true },
        },
        yAxis: {
          type: 'category',
          data: yLabels,
          splitArea: { show: true },
        },
        visualMap: {
          min: Math.min(...data.map((item: any) => item.total_value)),
          max: Math.max(...data.map((item: any) => item.total_value)),
          formatter: (value: number) => {
            if (value >= 1_000_000_000)
              return (value / 1_000_000_000).toFixed(1) + 'B';
            if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
            if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
            return value;
          },
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
        },
        series: [
          {
            name: 'Spend',
            type: 'heatmap',
            data: data.map((item: any) => [
              xLabels.indexOf(item.qtr),
              yLabels.indexOf(item.yr),
              item.total_value,
            ]),
            label: {
              show: false,
              formatter: (value: number) => {
                if (value >= 1_000_000_000)
                  return (value / 1_000_000_000).toFixed(1) + 'B';
                if (value >= 1_000_000)
                  return (value / 1_000_000).toFixed(1) + 'M';
                if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
                return value;
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    });

    this.service.totalQtybyYr().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.quantity : 0;
      var y: number = foundPrev ? foundPrev.quantity : 0;

      this.carousel_Qty = x;
      this.Qty_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log(this.Qty_diff);
      this.Qty_diff = Number(this.Qty_diff.toFixed(2));
    });

    this.service.totalPartiesbyYr().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.parties : 0;
      var y: number = foundPrev ? foundPrev.parties : 0;

      this.carousel_Party = x;
      this.Parties_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log(this.Parties_diff);
      this.Parties_diff = Number(this.Parties_diff.toFixed(2));
    });

    this.service.totalGrossbyYr().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.gross_sales : 0;
      var y: number = foundPrev ? foundPrev.gross_sales : 0;

      this.carousel_Gross = x;
      this.Gross_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log(this.Gross_diff);
      this.Gross_diff = Number(this.Gross_diff.toFixed(2));
    });

    this.service.totalNetbyYr().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.net_sales : 0;
      var y: number = foundPrev ? foundPrev.net_sales : 0;

      this.carousel_Net = x;
      this.Net_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log(this.Net_diff);
      this.Net_diff = Number(this.Net_diff.toFixed(2));
    });

    this.service.totalInvoicesbyYr().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.invoices : 0;
      var y: number = foundPrev ? foundPrev.invoices : 0;

      this.carousel_Invoices = x;
      this.Invoices_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log('Invoices diff:' + this.Invoices_diff);
      this.Invoices_diff = Number(this.Invoices_diff.toFixed(2));
    });

    this.service.totalTotalValueInvoicesbyYr().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.total_value : 0;
      var y: number = foundPrev ? foundPrev.total_value : 0;

      this.carousel_TotalValue = x;
      this.InvoicesValue_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log('Invoices Value diff:' + this.InvoicesValue_diff);
      this.InvoicesValue_diff = Number(this.InvoicesValue_diff.toFixed(2));
    });

    this.service.totalTotalDiscountbyYr().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.discount : 0;
      var y: number = foundPrev ? foundPrev.discount : 0;

      this.carousel_TotalDiscount = x;
      this.Discount_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log('Invoices Value diff:' + this.Discount_diff);
      this.Discount_diff = Number(this.Discount_diff.toFixed(2));
    });

    /* Reconciliation */
    /* Chip */
    this.service.checkedInvoices().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.checked_invoices : 0;
      var y: number = foundPrev ? foundPrev.checked_invoices : 0;

      this.carousel_CheckedInvoices = x;
      this.CheckedInvoices_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log('Invoices Value diff:' + this.FullMatches_diff);
      this.CheckedInvoices_diff = Number(this.CheckedInvoices_diff.toFixed(2));
    });

    this.service.fullMatches().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.fullmatches : 0;
      var y: number = foundPrev ? foundPrev.fullmatches : 0;

      this.carousel_TotalFullMatches = x;
      this.FullMatches_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log('Invoices Value diff:' + this.FullMatches_diff);
      this.FullMatches_diff = Number(this.FullMatches_diff.toFixed(2));
    });

    this.service.violatingVendors().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.vendor_count : 0;
      var y: number = foundPrev ? foundPrev.vendor_count : 0;

      this.carousel_ViolatingVendors = x;
      this.ViolatingVendors_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log('Invoices Value diff:' + this.PartialMatches_diff);
      this.ViolatingVendors_diff = Number(this.ViolatingVendors_diff.toFixed(2));
    });

    this.service.rejections().subscribe((data: any) => {
      var currentYear = new Date().getFullYear();
      var prevYear = new Date().getFullYear() - 1;

      var foundCurrent = data.find(function (item: any) {
        return item.yr === currentYear;
      });

      var foundPrev = data.find(function (item: any) {
        return item.yr === prevYear;
      });

      var x: number = foundCurrent ? foundCurrent.rejections : 0;
      var y: number = foundPrev ? foundPrev.rejections : 0;

      this.carousel_Rejections = x;
      this.Rejections_diff = ((x - y) / Math.abs(y)) * 100;
      // console.log('Invoices Value diff:' + this.Rejections_diff);
      this.Rejections_diff = Number(this.Rejections_diff.toFixed(2));
      // console.log("Rejections: " + this.carousel_Rejections + this.Rejections_diff)
    });

    /* Graph */
    this.service.top5VendorsByViolations().subscribe((data: any) => {
      this.chart10 = {
        title: {
          text: 'Top 5 Vendors by Violations',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.vendor),
          axisLabel: {
            show: true,
            width: 20,
            rotate: 45, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.rejections),
            type: 'bar',
          },
        ],
      };
    });

    this.service.partialMatchesByDate().subscribe((data: any) => {
      this.chart11 = {
        title: {
          text: 'Partial Matches Trend Over Time',
        },
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 60, // Add space for Y-axis labels
          right: 20,
          top: 40,
          bottom: 40,
          containLabel: true, // Ensures labels stay inside canvas
        },
        xAxis: {
          type: 'category',
          data: data.map((item: any) => item.date),
          axisLabel: {
            rotate: 45, // Optional: rotate for better fit if dates overlap
            fontSize: 10,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.partial_matches),
            type: 'line',
            smooth: true,
          },
        ],
      };
    });

    this.service.fullMatchesByDate().subscribe((data: any) => {
      this.chart12 = {
        title: {
          text: 'Full Matches Trend Over Time',
        },
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 60, // Add space for Y-axis labels
          right: 20,
          top: 40,
          bottom: 40,
          containLabel: true, // Ensures labels stay inside canvas
        },
        xAxis: {
          type: 'category',
          data: data.map((item: any) => item.date),
          axisLabel: {
            rotate: 45, // Optional: rotate for better fit if dates overlap
            fontSize: 10,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.full_matches),
            type: 'line',
            smooth: true,
          },
        ],
      };
    });

    this.service.mismatchesByCurrency().subscribe((data: any) => {
      this.chart13 = {
        title: {
          text: 'Rejections in Currencies',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.currency),
          axisLabel: {
            show: true,
            width: 20,
            rotate: 45, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.rejections),
            type: 'bar',
          },
        ],
      };
    });

    this.service.top5RejectionReasons().subscribe((data: any) => {
      this.chart14 = {
        title: {
          text: 'Top 5 Rejection Reasons',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.rejection_reason),
          axisLabel: {
            show: true,
            width: 20,
            rotate: 45, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.rejections),
            type: 'bar',
          },
        ],
      };
    });

    this.service.top5VendorsByItemMismatch().subscribe((data: any) => {
      this.chart15 = {
        title: {
          text: 'Top 5 Vendors by Item Mismatches',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.vendor),
          axisLabel: {
            show: true,
            width: 20,
            rotate: 45, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.item_mismatch),
            type: 'bar',
          },
        ],
      };
    });

    this.service.top5RejectionReasonByTaxDiscrepancy().subscribe((data: any) => {
      this.chart16 = {
        title: {
          text: 'Top 5 Rejection Reasons by Tax Discrepancy',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: {
          type: 'inside',
          show: true,
        },
        grid: {
          left: 30,
          right: 30,
          top: 60,
          bottom: 80,
          containLabel: true, // Ensures labels and chart are within view
        },
        xAxis: {
          type: 'category',
          interval: 20,
          data: data.map((item: any) => item.rejection_reason),
          axisLabel: {
            show: true,
            width: 20,
            rotate: 45, // Rotates labels for better readability
            fontSize: 8,
            overflow: 'truncate', // Optional: handles very long labels
          },
        },
        yAxis: {
          type: 'value',
          // interval:200000,
          axisLabel: {
            // fontSize: 10,
            formatter: (value: number) => {
              if (value >= 1_000_000_000)
                return (value / 1_000_000_000).toFixed(1) + 'B';
              if (value >= 1_000_000)
                return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
              return value;
            },
          },
        },
        series: [
          {
            data: data.map((item: any) => item.tax_discrepancy),
            type: 'bar',
          },
        ],
      };
    });


    this.http
      .get('../../assets/maps/india_administrative.json')
      // .get('../../assets/maps/india.json')
      .subscribe((geoJson: any) => {
        echarts.registerMap('india', geoJson);

        const scatterData = [
          {
            name: 'Pachhwara',
            value: [87.44829575092794, 24.539477983580408, 100],
            // [87.84805297818306, 28.240280145604631, 120], // [lon, lat, value]
            // [93.84805297818306, 7.240280145604631, 120], // [lon, lat, value]
          },
          {
            name: 'Ananta OCP',
            value: [85.15291671166591, 20.95199451958717, 200],
          },
          {
            name: 'Consortium-Magadh',
            value: [84.94974403734435, 23.855168476996777, 300],
          },
          {
            name: 'PKOCP (OC-II)-Manuguru',
            value: [80.78016927120257, 17.948483594919075, 500],
          },
          {
            name: 'Talaipalli',
            value: [83.50156899474943, 22.24190162283777, 400],
          },
        ];

        this.chartMap = {
          tooltip: { trigger: 'item' },
          geo: {
            tooltip: {
              zoom: 2.5,
              show: true,
              // formatter: (params: any) => {
              //   const value = params.value;
              //   const name = params.name || 'Unknown';
              //   const locationValue =
              //     value && value.length >= 3 ? value[2] : 'N/A';

              //   return `${name}<br/>Value: ${locationValue}`;
              // },
              formatter: (params: any) => `${params.name || 'Unknown'}`,
            },
            map: 'india',
            roam: true,
          },
          visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['High', 'Low'],
            inRange: { color: ['#e0ffff', '#006edd'] },
            calculable: true,
            zoom: 1,
          },
          // series: {
          //   type: 'effectScatter',
          //   coordinateSystem: 'geo',
          //   geoIndex: 0,
          //   itemStyle: {
          //     color: '#b02a02',
          //   },
          //   encode: {
          //     tooltip: 2,
          //   },
          //   data: [
          //     [24.539477983580408, 87.44829575092794, 100],
          //   ],
          // },
          series: {
            name: 'Location',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: scatterData,
            symbolSize: (val: any) => Math.sqrt(val[2]) * 2 * 0.5, // based on value
            itemStyle: {
              color: 'red',
            },
            emphasis: {
              label: {
                show: true,
                formatter: '{b}',
              },
            },
          },
          // name: 'Locations',
          // type: 'scatter',
          // data: [
          //   { name: 'Location A', value: [77.5946, 12.9716, 300] }, // [lon, lat, value]
          //   { name: 'Location B', value: [72.8777, 19.0760, 500] }
          // ],
          // type: 'map',
          // coordinateSystem: 'geo',
          // map: 'India',
          // roam: true,
          // emphasis: {
          //   label: {
          //     show: true
          //   }
          // },
          // data: [
          //   { name: 'Maharashtra', value: 800 },
          //   { name: 'Karnataka', value: 600 },
          //   { name: 'Delhi', value: 300 },
          //   { name: 'Location A', value: [77.5946, 12.9716, 300] }, // [lon, lat, value]
          //   { name: 'Location B', value: [72.8777, 19.0760, 500] }
          // ]
          // {
          //   name: 'Locations',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   data: [
          //     { name: 'Location A', value: [77.5946, 12.9716, 300] }, // [lon, lat, value]
          //     { name: 'Location B', value: [72.8777, 19.0760, 500] }
          //   ],
          //   symbolSize: (val: number[]) => Math.sqrt(val[2]) * 2,
          //   encode: {
          //     tooltip: 2
          //   },
          //   emphasis: {
          //     label: {
          //       show: true,
          //       formatter: '{b}'
          //     }
          //   }
          // }
          // ]
        };
      });

    this.setActiveTab('invoice');
  }

  onChartInit(ec: any) {
    this.chartInstance = ec;
  }

  resetZoom(): void {
    if (this.chartInstance) {
      this.chartInstance.setOption({
        geo: {
          zoom: 1,
          center: null, // resets to default
        },
      });
    }
  }
}

// import { FormatNumberPipe } from './format-number.pipe';

@Component({
  selector: 'app-animated-number',
  standalone: true,
  imports: [FormatNumberPipe],
  template: `<span>{{ currentValue | formatNumber }}</span>`,
})
export class AnimatedNumberComponent implements OnChanges {
  @Input() value = 0;
  @Input() duration = 2000; // animation duration in ms

  currentValue = 0;

  ngOnChanges() {
    const start = performance.now();
    const animate = (time: number) => {
      const elapsed = time - start;
      const rawProgress = Math.min(elapsed / this.duration, 1);
      const easedProgress = this.easeOutCubic(rawProgress);

      this.currentValue = Math.round(this.value * easedProgress);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.currentValue = this.value; // ensure exact end
      }
    };
    requestAnimationFrame(animate);
  }

  easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
