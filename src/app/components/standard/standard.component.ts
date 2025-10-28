import { Component } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrl: './standard.component.scss'
})
export class StandardComponent {
  // Company Code filter
  companyCode: string = '';
  chartOptions: any
  msme: any
  // Filter values
  supplier: string = '';
  purchasingDocument: string = '';
  postingDate: string = '';
  postingDate_1: string = '';
  smartFactsFilter: string = '1 Item';
  isInvoiceVisible = false;
  // Dropdown states
  activeDropdown: string | null = null;
  get_invoice_po_match_data: any;
  // constructor() { }
  get_invoice_po_details_data: any
  get_invoice_po_details_data_filter_value: any
  invoice_po_details_by_id_data: any
  way_match_checklist_data: any = []
  ebilling_way_match_checklist_data: any = []
  get_metadata_checklist_data: any
  way_match_checklist_data_check_list: any = false
  invoiceData: any
  // purchasingDocument: string = '';
  // Table data
  matchedCount: any = 0
  overInvoicedCount: any = 0
  underInvoicedCount: any = 0
  allCount: any = 0
  tableData: Array<{ field_name: string, invoice_present: string, value: string, notes?: string }> = [];

  // Smart facts options
  smartFactOptions = [
    { id: 'goodsReceipt', text: 'Is Goods Receipt Goods Amount Surplus', checked: true },
    { id: 'invoiceGoods', text: 'Is Invoice Goods Amount Surplus', checked: false },
    { id: 'grDeliveryCost', text: 'Is GR Delivery Cost Amount Surplus', checked: false },
    { id: 'invoiceDeliveryCost', text: 'Is Invoice Delivery Cost Amount Surplus', checked: false },
    { id: 'goodsReceiptQty', text: 'Is Goods Receipt Goods Quantity Surplus', checked: false },
    { id: 'invoiceGoodsQty', text: 'Is Invoice Goods Quantity Surplus', checked: false },
    { id: 'grDeliveryCostQty', text: 'Is GR Delivery Cost Quantity Surplus', checked: false },
    { id: 'invoiceDeliveryCostQty', text: 'Is Invoice Delivery Cost Qty Surplus', checked: false },
    { id: 'noGoodsReceipt', text: 'No Goods Receipt Posted', checked: false },
    { id: 'noInvoiceReceipt', text: 'No Invoice Receipt Posted', checked: false }
  ];
  smartFactOptions_1 = [
    { id: 'goodsReceipt', text: 'Is Goods Receipt Goods Amount Surplus', checked: true },
    { id: 'invoiceGoods', text: 'Is Invoice Goods Amount Surplus', checked: false },
    { id: 'grDeliveryCost', text: 'Is GR Delivery Cost Amount Surplus', checked: false },
    { id: 'invoiceDeliveryCost', text: 'Is Invoice Delivery Cost Amount Surplus', checked: false },
    { id: 'goodsReceiptQty', text: 'Is Goods Receipt Goods Quantity Surplus', checked: false },
    { id: 'invoiceGoodsQty', text: 'Is Invoice Goods Quantity Surplus', checked: false },
    { id: 'grDeliveryCostQty', text: 'Is GR Delivery Cost Quantity Surplus', checked: false },
    { id: 'invoiceDeliveryCostQty', text: 'Is Invoice Delivery Cost Qty Surplus', checked: false },
    { id: 'noGoodsReceipt', text: 'No Goods Receipt Posted', checked: false },
    { id: 'noInvoiceReceipt', text: 'No Invoice Receipt Posted', checked: false }
  ];

  // Chart data
  chartData = {
    initial: 850,
    writeOff: 65,
    correction: 35
  };

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    // this.get_invoice_po_match();
    this.get_invoice_po_details()
  }
  filteredDocuments() {
    const purchasingDocument_value = this.get_invoice_po_details_data_filter_value.filter((doc: any) =>
      doc.po_number.toLowerCase().includes(this.purchasingDocument.toLowerCase())
    );
    this.get_invoice_po_details_data = purchasingDocument_value;
    console.log("purchasingDocument_value", purchasingDocument_value)
  }

  toggleInvoiceInfo(data: any) {
    this.way_match_checklist_data = []
    console.log("toggleinvoiceinfo", data)
    this.invoiceData = data;
    this.isInvoiceVisible = true;
    this.get_invoice_po_match(this.invoiceData.invoice_id)
    this.invoice_po_details_by_id(this.invoiceData.invoice_id)
    this.way_match_checklist(this.invoiceData.invoice_id)
    this.invoice_details_data(this.invoiceData.batch_id)
    // this.get_metadata_checklist(this.invoiceData.invoice_id)
  }
  toggleInvoiceInfoClose() {
    this.isInvoiceVisible = false;
  }
  toggleDropdown(dropdown: string): void {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  toggleSmartFactOption(id: string): void {
    const option = this.smartFactOptions.find(opt => opt.id === id);
    if (option) {
      option.checked = !option.checked;
    }
  }

  closeAllDropdowns(): void {
    this.activeDropdown = null;
  }

  // Handle view changes (table/chart toggle)
  changeView(view: string): void {
    console.log(`View changed to: ${view}`);
    // Implementation logic for changing view
  }

  // Process document item
  processItem(document: any): void {
    console.log(`Processing document: ${document.id}`);
    // Implementation logic for processing
  }

  // Expand document details
  expandDetails(document: any): void {
    console.log(`Expanding details for: ${document}`);
    // Implementation logic for expanding details
  }

  get_invoice_po_match(invoiceId: any) {
    this.projectService.get_invoice_po_match(invoiceId).subscribe((data: any) => {
      console.log("get match data %%%%%", data);
      this.get_invoice_po_match_data = data;
    });
  }
  get_invoice_po_details() {
    this.projectService.get_invoice_po_details().subscribe((data: any) => {
      console.log("get_invoice_po_match", data);
      // this.invoice_details_data(data.data[0].batch_id)
      this.get_invoice_po_details_data = data.data;
      this.get_invoice_po_details_data_filter_value = data.data;

      this.matchedCount = this.get_invoice_po_details_data_filter_value.filter((res: any) =>
        res.po_lineitem_count - res.invoice_lineitem_count === 0
      ).length;

      this.overInvoicedCount = this.get_invoice_po_details_data_filter_value.filter((res: any) =>
        res.po_lineitem_count - res.invoice_lineitem_count < 0
      ).length;

      this.underInvoicedCount = this.get_invoice_po_details_data_filter_value.filter((res: any) =>
        res.po_lineitem_count - res.invoice_lineitem_count > 0
      ).length;

      this.allCount = this.get_invoice_po_details_data_filter_value.length;

      this.chartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['All', 'Matched', 'Over Invoiced', 'Under Invoiced'],
        },
        xAxis: {
          type: 'category',
          data: ['Status']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Matched',
            type: 'bar',
            stack: 'total',
            emphasis: { focus: 'series' },
            data: [this.matchedCount],
            triggerLineEvent: true,
          },
          {
            name: 'Over Invoiced',
            type: 'bar',
            stack: 'total',
            emphasis: { focus: 'series' },
            data: [this.overInvoicedCount],
            triggerLineEvent: true,
          },
          {
            name: 'Under Invoiced',
            type: 'bar',
            stack: 'total',
            emphasis: { focus: 'series' },
            data: [this.underInvoicedCount],
            triggerLineEvent: true,
          },
          // {
          //   name: 'All',
          //   type: 'bar',
          //   stack: 'total',
          //   emphasis: { focus: 'series' },
          //   data: [this.allCount],
          // }
        ]
      };

    });
  }
  invoice_po_details_by_id(invoice_id: any) {
    this.projectService.invoice_po_details_by_id(invoice_id).subscribe((data: any) => {
      console.log("invoice_po_details_by_id_data", data);
      this.invoice_po_details_by_id_data = data;
    });
  }

  way_match_checklist(invoice_id: any) {
    this.projectService.way_match_checklist(invoice_id).subscribe((data: any) => {
      console.log("invoice_po_details_by_id_data &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", data);
      data.map((res: any) => {
        this.way_match_checklist_data.push(res);
      })
      this.get_metadata_checklist(invoice_id)
    });

  }
  get_metadata_checklist(invoice_id: any) {
    this.projectService.get_metadata_checklist(invoice_id).subscribe((data: any) => {
      console.log("get_metadata_checklist_1", data);
      data.map((res: any) => {
        this.way_match_checklist_data.push(res);
      })
      // this.get_metadata_checklist_data = data;
    });
  }

  onChartClick(event: any): void {
    const filteredData: any[] = [];
    const seriesName = event.seriesName;

    console.log('Chart clicked:', event);

    if (event.componentType === 'series') {
      // Filter logic based on clicked series
      this.get_invoice_po_details_data_filter_value.forEach((res: any) => {
        const diff = res.po_lineitem_count - res.invoice_lineitem_count;

        if (seriesName === 'Matched' && diff === 0) {
          filteredData.push(res);
        } else if (seriesName === 'Over Invoiced' && diff < 0) {
          filteredData.push(res);
        } else if (seriesName === 'Under Invoiced' && diff > 0) {
          filteredData.push(res);
        } else if (seriesName === 'All') {
          filteredData.push(res);
        }
      });

      // Build series array dynamically
      const fullSeries = [
        {
          name: 'Matched',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: [this.get_invoice_po_details_data_filter_value.filter((res: any) => res.po_lineitem_count - res.invoice_lineitem_count === 0).length],
        },
        {
          name: 'Over Invoiced',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: [this.get_invoice_po_details_data_filter_value.filter((res: any) => res.po_lineitem_count - res.invoice_lineitem_count < 0).length],
        },
        {
          name: 'Under Invoiced',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: [this.get_invoice_po_details_data_filter_value.filter((res: any) => res.po_lineitem_count - res.invoice_lineitem_count > 0).length],
        },
        // {
        //   name: 'All',
        //   type: 'bar',
        //   stack: 'total',
        //   emphasis: { focus: 'series' },
        //   data: [this.get_invoice_po_details_data_filter_value.length],
        // }
      ];

      // Filter chart to only show clicked series + All (or all series if "All" clicked)
      const updatedSeries = seriesName === 'All'
        ? fullSeries
        : fullSeries.filter(s => s.name === seriesName || s.name === 'All');

      this.chartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['All', 'Matched', 'Over Invoiced', 'Under Invoiced'],
        },
        xAxis: {
          type: 'category',
          data: ['Status']
        },
        yAxis: {
          type: 'value'
        },
        series: updatedSeries
      };

      this.get_invoice_po_details_data = filteredData;
      console.log('Filtered data:', filteredData);
    }
  }

  changethechecklist(e: any) {
    // alert(e.target.value)
    if (e == 'invtoebill') {
      this.way_match_checklist_data_check_list = true
      this.compare_invoice_ewaybill_by_number(this.invoice_po_details_by_id_data.invoice_number)
    } else {
      this.way_match_checklist_data_check_list = false
    }

  }

  compare_invoice_ewaybill_by_number(invoice_id: any) {
    this.ebilling_way_match_checklist_data = []
    this.projectService.compare_invoice_ewaybill_by_number(invoice_id).subscribe((data: any) => {
      console.log("get_metadata_checklist", data);
      // data.map((res:any) => {
      //   this.ebilling_way_match_checklist_data.push(res);
      // })
      this.prepareTableData(data);
      // this.ebilling_way_match_checklist_data = data;
      // console.log("this.ebilling_way_match_checklist_data",this.ebilling_way_match_checklist_data)
      // this.get_metadata_checklist_data = data;
    });
  }

  filterDatewise() {
    console.log(this.postingDate)
    console.log(this.postingDate_1)

    if (this.postingDate) {
      const fromDate = new Date(this.postingDate);
      const toDate = new Date(this.postingDate_1);
      console.log("this.get_invoice_po_details_data", this.get_invoice_po_details_data)
      // Function to filter by invoice_date within the range
      const filteredData = this.get_invoice_po_details_data_filter_value.filter((item: any) => {
        if (!item.invoice_date) return false; // skip null or missing dates

        const invoiceDate = new Date(item.invoice_date);
        return invoiceDate >= fromDate && invoiceDate <= toDate;
      });
      this.get_invoice_po_details_data = filteredData
      console.log(filteredData);
    } else {
      this.get_invoice_po_details_data = this.get_invoice_po_details_data_filter_value
    }

  }

  prepareTableData(data: any) {
    const fieldPairs = [
      ['invoice_number', 'invoice_number_status'],
      ['invoice_date', 'invoice_date_status'],
      ['supplier_gstin_invoice', 'supplier_gstin_status'],
      ['buyer_gstin_invoice', 'buyer_gstin_status'],
      ['delivery_location_invoice', 'delivery_location_status']
    ];

    this.tableData = fieldPairs.map(([valueKey, statusKey]) => {
      return {
        field_name: valueKey,
        value: data[valueKey],
        status: data[statusKey],
        invoice_present: data[statusKey] === 'yes' ? 'Yes' : 'No',
        notes: ''
      };
    });
  }


  invoice_details_data(id: any) {
    this.projectService.invoice_detials_based_on_id(id).subscribe((res: any) => {
      console.log("invoice_details_datainvoice_details_data", res);
      this.msme = res.msme
      // this.generate_invoice_checklist(res.invoice_id)
    })
  }


  getDueDate(baseDate: string, term: string): string {
    // Extract number of days from the term (e.g. Net45days → 45)
    const match = term.match(/\d+/);
    const days = match ? parseInt(match[0], 10) : 0;

    // Convert baseDate string to Date object
    const date = new Date(baseDate);

    // Add the extracted number of days
    date.setDate(date.getDate() + days);

    // Return date in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

}
