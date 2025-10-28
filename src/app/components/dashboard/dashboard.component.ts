import { Component, HostListener } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = 'Reconciliation Dashboard';
  filterBy = 'Company Code';
  activeDropdown: string | null = null;
  selectedView = 'Standard';
  
  // Chart options for GR/IR Reconciliation Processing
  grirChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['Initial', 'Perform Write-off', 'Correction of Invoice Expected', 'Write-off completed successfully', 'Request Completion of Delivery'],
      show: false
    },
    color: ['#5B9BD5', '#ED7D31', '#70AD47', '#C65911', '#7030A0'],
    series: [
      {
        name: 'Processing Step',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{c}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 65000, name: 'Initial' },
          { value: 300, name: 'Perform Write-off' },
          { value: 200, name: 'Correction of Invoice Expected' },
          { value: 150, name: 'Write-off completed successfully' },
          { value: 350, name: 'Request Completion of Delivery' }
        ]
      }
    ]
  };

  // Chart options for IR Amount Surplus
  irSurplusChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['Mover Parts Inc.', 'Inland subcontractor A, SE', 'Vendor V8007', 'Vendor V8004'],
      show: false
    },
    color: ['#5B9BD5', '#ED7D31', '#70AD47', '#C65911', '#7030A0', '#4472C4', '#FFC000'],
    series: [
      {
        name: 'Supplier',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{c}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 106, name: 'Mover Parts Inc.' },
          { value: 97, name: 'Inland subcontractor A, SE' },
          { value: 84, name: 'Vendor V8007' },
          { value: 70, name: 'Vendor V8004' },
          { value: 64, name: 'Vendor V8001' },
          { value: 61, name: 'Vendor V8002' },
          { value: 60, name: 'Vendor V8003' },
          { value: 45, name: 'Vendor V8005' },
          { value: 36, name: 'Vendor V8006' },
          { value: 8, name: 'Other vendors' }
        ]
      }
    ]
  };

  // Chart options for GR Amount Surplus
  grSurplusChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      show: false
    },
    color: ['#5B9BD5', '#ED7D31', '#70AD47', '#C65911', '#7030A0', '#4472C4', '#FFC000', '#A5A5A5'],
    series: [
      {
        name: 'Supplier',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{c}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 171, name: 'Inland subcontractor A, SE' },
          { value: 161, name: 'Mover Parts Inc.' },
          { value: 107, name: 'General Supplier' },
          { value: 52, name: 'Vendor V8001' },
          { value: 44, name: 'Vendor V8002' },
          { value: 42, name: 'Vendor V8003' },
          { value: 24, name: 'Vendor V8004' },
          { value: 21, name: 'Vendor V8005' },
          { value: 16, name: 'Vendor V8006' },
          { value: 12, name: 'Vendor V8007' },
          { value: 10, name: 'Vendor V8008' },
          { value: 9.5, name: 'Vendor V8009' },
          { value: 1, name: 'Other vendors' }
        ]
      }
    ]
  };

  // Chart options for GR Amount Equals IR Amount
  grIrEqualChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      show: false
    },
    color: ['#5B9BD5', '#ED7D31', '#70AD47', '#C65911', '#7030A0', '#4472C4', '#FFC000', '#A5A5A5'],
    series: [
      {
        name: 'Material Group',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{c}K'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 7, name: 'Frame' },
          { value: 7, name: 'Handle Bars' },
          { value: 7, name: 'Forks' },
          { value: 7, name: 'Drive Train' },
          { value: 7, name: 'Derailleur Gears' },
          { value: 7, name: 'Wheels' },
          { value: 7, name: 'Brakes' },
          { value: 7, name: 'Seat' },
          { value: 5, name: 'Pedal Kit' },
          { value: 5, name: 'Other Components' },
          { value: 2, name: 'Accessories' },
          { value: 2, name: 'Tools' },
          { value: 2, name: 'Packaging' }
        ]
      }
    ]
  };

  // Financial overview data
  fiItemsCount = '131 K';
  fiOpenAmount = '181 K';
  fiTotalUSD = '-33 M';

  // Dropdown options
  processingStepOptions = ['All Steps', 'Initial', 'Perform Write-off', 'Correction of Invoice Expected', 'Write-off completed successfully', 'Request Completion of Delivery'];
  supplierOptions = ['All Suppliers', 'Mover Parts Inc.', 'Inland subcontractor A, SE', 'General Supplier', 'Vendor V8001', 'Vendor V8002', 'Vendor V8003', 'Vendor V8004'];
  materialGroupOptions = ['All Groups', 'Frame', 'Handle Bars', 'Forks', 'Drive Train', 'Derailleur Gears', 'Wheels', 'Brakes', 'Seat', 'Pedal Kit'];

  // Selected dropdown values
  selectedProcessingStep = 'All Steps';
  selectedSupplier1 = 'All Suppliers';
  selectedSupplier2 = 'All Suppliers';
  selectedMaterialGroup = 'All Groups';
  selectedSupplierFI = 'All Suppliers';

  constructor() { }

  ngOnInit(): void {
    // Initialize charts and data
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Close dropdown when clicking outside
    if (this.activeDropdown && !(event.target as HTMLElement).closest('.dropdown-wrapper')) {
      this.activeDropdown = null;
    }
  }

  toggleDropdown(dropdown: string): void {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  selectView(view: string): void {
    this.selectedView = view;
    this.activeDropdown = null;
    // Change dashboard view based on selection
  }

  selectProcessingStep(option: string): void {
    this.selectedProcessingStep = option;
    this.activeDropdown = null;
    // Update processing step chart
  }

  selectSupplier1(option: string): void {
    this.selectedSupplier1 = option;
    this.activeDropdown = null;
    // Update IR Amount Surplus chart
  }

  selectSupplier2(option: string): void {
    this.selectedSupplier2 = option;
    this.activeDropdown = null;
    // Update GR Amount Surplus chart
  }

  selectMaterialGroup(option: string): void {
    this.selectedMaterialGroup = option;
    this.activeDropdown = null;
    // Update GR Amount Equals IR Amount chart
  }

  selectSupplierFI(option: string): void {
    this.selectedSupplierFI = option;
    this.activeDropdown = null;
    // Update Open FI Items chart
  }

  onChartClick(event: any): void {
    console.log('Chart clicked:', event);
    // Handle click event - could filter data or navigate to detail view
  }

  onFilterChange(filter: string): void {
    this.filterBy = filter;
    // Update charts based on new filter
  }
}
