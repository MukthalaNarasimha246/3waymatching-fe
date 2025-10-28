import { ChangeDetectorRef, Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-duplicate-similarity',
  templateUrl: './duplicate-similarity.component.html',
  styleUrl: './duplicate-similarity.component.scss',
  animations: [
    trigger('splashAnimation', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0,
        pointerEvents: 'none'
      })),
      transition('show => hide', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class DuplicateSimilarityComponent {
  // Splash screen properties
  showSplash = true;
  splashState = 'show';
  splashProgress = 0;
  image_duplicates_value: any
  // Scan animation properties
  scanActive = false;
  scanProgress1 = 0;
  scanProgress2 = 0;
  scanPoints1: { x: number, y: number, delay: number }[] = [];
  scanPoints2: { x: number, y: number, delay: number }[] = [];
  image_duplicates_image: any
  image_orginal_image: any
  // Metric values
  metricValues = {
    text: 0,
    image: 0,
    overall: 0
  };

  // Circle properties for progress ring
  circleCircumference = 2 * Math.PI * 20; // For circle with r=20

  // Remarks
  remarks = '';

  constructor(private cdr: ChangeDetectorRef, private projectService: ProjectsService, private activaterouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Start splash screen progress
    this.animateSplashProgress();
    this.activaterouter.params.subscribe((params) => {
      console.log("params", params);
      this.image_duplicates(params['id'])
    })
  }

  ngAfterViewInit(): void {
    // Hide splash screen after 3 seconds
    setTimeout(() => {
      this.splashState = 'hide';

      // Start scan animations after splash screen hiding transition
      setTimeout(() => {
        this.startScanAnimation();
      }, 500);

      this.cdr.detectChanges();
    }, 3000);
  }

  animateSplashProgress(): void {
    // Animate splash screen progress bar from 0 to 100%
    const startTime = performance.now();
    const duration = 3000; // 3 seconds

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use ease-out cubic for smoother progress
      this.splashProgress = Math.round(100 * (1 - Math.pow(1 - progress, 3)));

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
      this.cdr.detectChanges();
    };

    requestAnimationFrame(updateProgress);
  }

  startScanAnimation(): void {
    // Start scanning animation
    this.scanActive = true;

    // Generate scan points for the first image
    this.generateScanPoints(1, 0);

    // Generate scan points for the second image with a delay
    setTimeout(() => {
      this.generateScanPoints(2, 500);
    }, 500);

    // Start progress counters
    this.animateProgressCounter(1, 2500);
    setTimeout(() => {
      this.animateProgressCounter(2, 2500);
    }, 500);

    // Animate the metric bars after scanning completes
    setTimeout(() => {
      this.animateMetricValues();
    }, 3500);
  }

  generateScanPoints(imageIndex: number, initialDelay: number): void {
    const count = 15; // Number of points
    const duration = 2500; // Animation duration in ms
    const points: { x: number, y: number, delay: number }[] = [];

    for (let i = 0; i < count; i++) {
      // Random position (10% to 90% to keep away from edges)
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;

      // Stagger the appearance
      const delay = initialDelay + (i / count) * duration;

      points.push({ x, y, delay });
    }

    // Update the appropriate points array
    if (imageIndex === 1) {
      this.scanPoints1 = points;
    } else {
      this.scanPoints2 = points;
    }

    this.cdr.detectChanges();
  }

  animateProgressCounter(imageIndex: number, duration: number): void {
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Update the appropriate progress value
      if (imageIndex === 1) {
        this.scanProgress1 = Math.round(progress * 100);
      } else {
        this.scanProgress2 = Math.round(progress * 100);
      }

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
      this.cdr.detectChanges();
    };

    requestAnimationFrame(updateProgress);
  }

  animateMetricValues(): void {
    // Final values for metrics
    const finalValues = {
      text: 30,
      image: 30,
      overall: 30
    };

    // Animate text similarity
    this.animateMetricValue('text', finalValues.text, 1500);

    // Animate image similarity with a delay
    setTimeout(() => {
      this.animateMetricValue('image', finalValues.image, 1500);
    }, 300);

    // Animate overall similarity with a longer delay
    setTimeout(() => {
      this.animateMetricValue('overall', finalValues.overall, 1500);
    }, 600);
  }

  animateMetricValue(metric: string, endValue: number, duration: number): void {
    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutQuart for smoother animation
      const eased = 1 - Math.pow(1 - progress, 4);
      // this.metricValues[metric] = Math.floor(eased * endValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
      this.cdr.detectChanges();
    };

    requestAnimationFrame(updateValue);
  }

  // Calculate the stroke-dashoffset for the progress ring
  calculateOffset(percentage: number): number {
    return this.circleCircumference - (this.circleCircumference * percentage / 100);
  }

  onSubmit(): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Successful Remarks',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });

    this.router.navigate(['/data-clasification']);





  }

  image_duplicates(id: any) {
    this.projectService.image_duplicates(id).subscribe((response: any) => {
      console.log("responseresponse", response);
      this.image_duplicates_value = response
      if (response.duplicate_status == 'similarity Found') {
        this.image_duplicates_image = `http://127.0.0.1:8001/similarity/${response['similarity_image']}`
      } else {
        this.image_duplicates_image = `http://127.0.0.1:8001/images_duplicate/${response['target_image']}`
      }
      this.image_orginal_image = this.image_orginal_image = `http://localhost:8001/files/${response['reference_image']}`


      this.metricValues['image'] = this.checkPercentage(this.image_duplicates_value['feature_similarity'])
      this.metricValues['text'] = this.checkPercentage(this.image_duplicates_value['text_similarity'])
      // console.log("imageDocView", this.imageDocView)
      // alert('Image duplicates fetched successfully!');
    }, (error) => {
      console.error('Error fetching image duplicates:', error);
      // alert('Error fetching image duplicates');
    });
  }

  checkPercentage(value: any) {
    const base = 1;
    const percentage = (value / base) * 100;

    return percentage;
  }

}
