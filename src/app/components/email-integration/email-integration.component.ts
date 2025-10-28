import { Component, ElementRef, ViewChild } from '@angular/core';
import Modeler from 'bpmn-js/lib/Modeler';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-email-integration',
  templateUrl: './email-integration.component.html',
  styleUrl: './email-integration.component.scss'
})
export class EmailIntegrationComponent {
private bpmnJS!: Modeler;
  constructor() {

   }


   showModal = false;
  modalText = '';
  summaryEl: any;

  dummyEmail = {
    sender: 'finance@example.com',
    subject: 'Invoice for PO#12345 - Urgent',
    snippet: 'Please process the attached invoice immediately.',
    important: true
  };


  @ViewChild('bpmnViewer', { static: true }) bpmnViewer: ElementRef | undefined;
  // Add any methods or properties needed for email integration functionality here

  private xml:string = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_0mryejt" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="5.36.0" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.7.0">
  <bpmn:process id="Process_0dyi4cb" name="Yes" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_0guc1of</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0guc1of" sourceRef="StartEvent_1" targetRef="Activity_07fy4tz" />
    <bpmn:serviceTask id="Activity_07fy4tz" name="Review Email">
      <bpmn:extensionElements>
        <zeebe:taskDefinition type="test" />
        <zeebe:properties>
          <zeebe:property />
        </zeebe:properties>
        <zeebe:ioMapping>
          <zeebe:output target="OutputVariable_0e4l30u" />
        </zeebe:ioMapping>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0guc1of</bpmn:incoming>
      <bpmn:outgoing>Flow_1snxau2</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_0hxcpm8">
      <bpmn:incoming>Flow_1snxau2</bpmn:incoming>
      <bpmn:outgoing>Flow_1ukflv9</bpmn:outgoing>
      <bpmn:outgoing>Flow_1b952ew</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_1snxau2" sourceRef="Activity_07fy4tz" targetRef="Gateway_0hxcpm8" />
    <bpmn:sequenceFlow id="Flow_1ukflv9" name="is Important" sourceRef="Gateway_0hxcpm8" targetRef="Activity_14evdpr" />
    <bpmn:serviceTask id="Activity_14evdpr" name="Notify Team">
      <bpmn:incoming>Flow_1ukflv9</bpmn:incoming>
      <bpmn:outgoing>Flow_129i9ua</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_1b952ew" sourceRef="Gateway_0hxcpm8" targetRef="Activity_03iozxp" />
    <bpmn:serviceTask id="Activity_03iozxp" name="Archive Email">
      <bpmn:incoming>Flow_1b952ew</bpmn:incoming>
      <bpmn:outgoing>Flow_0sy2qmk</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_129i9ua" sourceRef="Activity_14evdpr" targetRef="Activity_05kzbgv" />
    <bpmn:serviceTask id="Activity_05kzbgv" name="Download Invoice">
      <bpmn:incoming>Flow_129i9ua</bpmn:incoming>
      <bpmn:outgoing>Flow_1dx8bxz</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_1dx8bxz" sourceRef="Activity_05kzbgv" targetRef="Activity_0krmnvo" />
    <bpmn:serviceTask id="Activity_0krmnvo" name="Invoice Extraction">
      <bpmn:incoming>Flow_1dx8bxz</bpmn:incoming>
      <bpmn:outgoing>Flow_1tqik4p</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_1tqik4p" sourceRef="Activity_0krmnvo" targetRef="Activity_09kyfth" />
    <bpmn:serviceTask id="Activity_09kyfth" name="Duplicate Detection">
      <bpmn:incoming>Flow_1tqik4p</bpmn:incoming>
      <bpmn:outgoing>Flow_1g8bk32</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_1o1az7v">
      <bpmn:incoming>Flow_1g8bk32</bpmn:incoming>
      <bpmn:outgoing>Flow_0zn76u5</bpmn:outgoing>
      <bpmn:outgoing>Flow_080a8xp</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_1g8bk32" sourceRef="Activity_09kyfth" targetRef="Gateway_1o1az7v" />
    <bpmn:sequenceFlow id="Flow_0zn76u5" name="No" sourceRef="Gateway_1o1az7v" targetRef="Activity_0iqh3dy" />
    <bpmn:serviceTask id="Activity_0iqh3dy" name="Audit Check list">
      <bpmn:incoming>Flow_0zn76u5</bpmn:incoming>
      <bpmn:outgoing>Flow_055h2ej</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:endEvent id="Event_0grrakf" name="Exit">
      <bpmn:incoming>Flow_080a8xp</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_080a8xp" name="Yes" sourceRef="Gateway_1o1az7v" targetRef="Event_0grrakf" />
    <bpmn:exclusiveGateway id="Gateway_1s2991s">
      <bpmn:incoming>Flow_055h2ej</bpmn:incoming>
      <bpmn:outgoing>Flow_0zbev50</bpmn:outgoing>
      <bpmn:outgoing>Flow_14hel45</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_055h2ej" sourceRef="Activity_0iqh3dy" targetRef="Gateway_1s2991s" />
    <bpmn:task id="Activity_0a2shv0" name="PO Mapping &#38; 3 Way Matching">
      <bpmn:incoming>Flow_0zbev50</bpmn:incoming>
      <bpmn:outgoing>Flow_0ckzu4x</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0zbev50" name="No" sourceRef="Gateway_1s2991s" targetRef="Activity_0a2shv0" />
    <bpmn:endEvent id="Event_1n4f6sz">
      <bpmn:incoming>Flow_14hel45</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_14hel45" sourceRef="Gateway_1s2991s" targetRef="Event_1n4f6sz" />
    <bpmn:endEvent id="Event_1jibjer">
      <bpmn:incoming>Flow_0ckzu4x</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0ckzu4x" sourceRef="Activity_0a2shv0" targetRef="Event_1jibjer" />
    <bpmn:endEvent id="Event_0790l8g">
      <bpmn:incoming>Flow_0sy2qmk</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0sy2qmk" sourceRef="Activity_03iozxp" targetRef="Event_0790l8g" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0dyi4cb">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="182" y="332" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0cs7jya_di" bpmnElement="Activity_07fy4tz">
        <dc:Bounds x="270" y="310" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0hxcpm8_di" bpmnElement="Gateway_0hxcpm8" isMarkerVisible="true">
        <dc:Bounds x="425" y="325" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1o1az7v_di" bpmnElement="Gateway_1o1az7v" isMarkerVisible="true">
        <dc:Bounds x="1255" y="135" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1s2991s_di" bpmnElement="Gateway_1s2991s" isMarkerVisible="true">
        <dc:Bounds x="1595" y="195" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_09jf1hi_di" bpmnElement="Activity_03iozxp">
        <dc:Bounds x="560" y="310" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0790l8g_di" bpmnElement="Event_0790l8g">
        <dc:Bounds x="902" y="332" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_01wgb1a_di" bpmnElement="Activity_14evdpr">
        <dc:Bounds x="490" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1dbuhd1_di" bpmnElement="Activity_05kzbgv">
        <dc:Bounds x="690" y="190" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_05oio52_di" bpmnElement="Activity_0krmnvo">
        <dc:Bounds x="890" y="190" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ijndpm_di" bpmnElement="Activity_09kyfth">
        <dc:Bounds x="1090" y="190" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0grrakf_di" bpmnElement="Event_0grrakf">
        <dc:Bounds x="1302" y="82" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1310" y="125" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0m3d7lw_di" bpmnElement="Activity_0iqh3dy">
        <dc:Bounds x="1400" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0a2shv0_di" bpmnElement="Activity_0a2shv0">
        <dc:Bounds x="1740" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1jibjer_di" bpmnElement="Event_1jibjer">
        <dc:Bounds x="1942" y="232" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1n4f6sz_di" bpmnElement="Event_1n4f6sz">
        <dc:Bounds x="1602" y="92" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0guc1of_di" bpmnElement="Flow_0guc1of">
        <di:waypoint x="218" y="350" />
        <di:waypoint x="270" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1snxau2_di" bpmnElement="Flow_1snxau2">
        <di:waypoint x="370" y="350" />
        <di:waypoint x="425" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ukflv9_di" bpmnElement="Flow_1ukflv9">
        <di:waypoint x="450" y="325" />
        <di:waypoint x="450" y="220" />
        <di:waypoint x="490" y="220" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="437" y="268" width="59" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1b952ew_di" bpmnElement="Flow_1b952ew">
        <di:waypoint x="475" y="350" />
        <di:waypoint x="560" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0sy2qmk_di" bpmnElement="Flow_0sy2qmk">
        <di:waypoint x="660" y="350" />
        <di:waypoint x="902" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1g8bk32_di" bpmnElement="Flow_1g8bk32">
        <di:waypoint x="1190" y="230" />
        <di:waypoint x="1280" y="230" />
        <di:waypoint x="1280" y="185" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zn76u5_di" bpmnElement="Flow_0zn76u5">
        <di:waypoint x="1280" y="185" />
        <di:waypoint x="1280" y="250" />
        <di:waypoint x="1400" y="250" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1288" y="230" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_080a8xp_di" bpmnElement="Flow_080a8xp">
        <di:waypoint x="1280" y="135" />
        <di:waypoint x="1280" y="100" />
        <di:waypoint x="1302" y="100" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1286" y="112" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_055h2ej_di" bpmnElement="Flow_055h2ej">
        <di:waypoint x="1500" y="250" />
        <di:waypoint x="1548" y="250" />
        <di:waypoint x="1548" y="220" />
        <di:waypoint x="1595" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zbev50_di" bpmnElement="Flow_0zbev50">
        <di:waypoint x="1645" y="220" />
        <di:waypoint x="1693" y="220" />
        <di:waypoint x="1693" y="250" />
        <di:waypoint x="1740" y="250" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1709" y="232" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_14hel45_di" bpmnElement="Flow_14hel45">
        <di:waypoint x="1620" y="195" />
        <di:waypoint x="1620" y="128" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_129i9ua_di" bpmnElement="Flow_129i9ua">
        <di:waypoint x="590" y="220" />
        <di:waypoint x="640" y="220" />
        <di:waypoint x="640" y="230" />
        <di:waypoint x="690" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dx8bxz_di" bpmnElement="Flow_1dx8bxz">
        <di:waypoint x="790" y="230" />
        <di:waypoint x="890" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1tqik4p_di" bpmnElement="Flow_1tqik4p">
        <di:waypoint x="990" y="230" />
        <di:waypoint x="1090" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ckzu4x_di" bpmnElement="Flow_0ckzu4x">
        <di:waypoint x="1840" y="250" />
        <di:waypoint x="1942" y="250" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>


`;

  // ngAfterViewInit() {
  //   this.bpmnJS = new Modeler({
  //     container: this.bpmnViewer?.nativeElement,

  //   });
  //   // This lifecycle hook can be used for any initialization after the view is fully initialized

  //   this.importDiagram(this.xml).subscribe({
  //     next: (result) => {
  //       console.log('Diagram imported successfully', result.warnings);
  //     },
  //     error: (err) => {
  //       console.error('Error importing diagram', err);
  //     }
  //   });

  // }
   ngAfterViewInit(): void {
    this.bpmnJS = new Modeler({
      container: this.bpmnViewer?.nativeElement
    });

    this.summaryEl = document.getElementById('summary');

    this.importDiagram(this.xml).subscribe({
      next: (result) => {
        console.log('Diagram imported successfully', result.warnings)
        this.injectCanvasHighlightStyles();
        this.runWorkflow();
      },
      error: (err) => console.error('Error importing diagram', err)

    });

  }


  private importDiagram(xml:string):Observable< { warnings: any[] }> {

    return from(this.bpmnJS.importXML(xml));
  }

  runWorkflow(): void {
    alert("Hi")
    this.updateSummary('system@workflow.com', 'Running Workflow', 'Simulating execution flow...');
    const email = {
      sender: 'finance@example.com',
      subject: 'Invoice for PO#12345 - Urgent',
      snippet: 'Please process the attached invoice immediately.',
      important: true
    };

    this.runStep('StartEvent_1', 'Start Event: New Email');

    setTimeout(() => this.runStep('Activity_07fy4tz', 'Review Email'), 1000);
    setTimeout(() => this.runStep('Gateway_0hxcpm8', 'Check if Email is Important'), 2000);

    if (email.important) {
      setTimeout(() => this.runStep('Activity_14evdpr', 'Notify Team'), 3000);
      setTimeout(() => this.runStep('Activity_05kzbgv', 'Download Invoice'), 4000);
      setTimeout(() => this.runStep('Activity_0krmnvo', 'Invoice Extraction'), 5000);
      setTimeout(() => this.runStep('Activity_09kyfth', 'Duplicate Detection'), 6000);
      setTimeout(() => {
        this.runStep('Gateway_1o1az7v', 'Check for Duplicates');

        const duplicateFound = false;

        if (duplicateFound) {
          setTimeout(() => this.runStep('Event_0grrakf', 'End: Duplicate Detected → Exit'), 1000);
        } else {
          setTimeout(() => this.runStep('Activity_0iqh3dy', 'Audit Checklist'), 1000);
          setTimeout(() => this.runStep('Gateway_1s2991s', 'Is Audit Required?'), 2000);

          const auditRequired = true;

          if (auditRequired) {
            setTimeout(() => this.runStep('Activity_0a2shv0', 'PO Mapping & 3 Way Matching'), 3000);
            setTimeout(() => this.runStep('Event_1jibjer', 'End: PO Processed'), 4000);
          } else {
            setTimeout(() => this.runStep('Event_1n4f6sz', 'End: Audit Passed - Exit'), 3000);
          }
        }
      }, 7000);
    } else {
      setTimeout(() => this.runStep('Activity_03iozxp', 'Archive Email'), 3000);
      setTimeout(() => this.runStep('Event_0790l8g', 'End: Archived'), 4000);
    }

  }

  runStep(id: string, message: string): void {
    this.updateSummary("System", "Now Running", message);
    // alert(id + " " + message);

    console.log(`Running step: ${id} - ${message}`);
    this.highlightElement(id);

    if (message === 'Notify Team') {
      this.modalText = `From: Workflow\nSubject: ${message}\n\nCritical task for important email.`;
      this.showModal = true;
    }
  }

  highlightElement(id: string): void {
    console.log(`Highlighting element: ${this.bpmnJS.get('canvas')}`);
    const canvas = this.bpmnJS.get('canvas') as any;
    console.log("++++++++", id)
    canvas.addMarker(id, 'highlight');
    // console.log(`Canvas: ${canvas.addMarker(id, 'highlight')}`);
    setTimeout(() => canvas.removeMarker(id, 'highlight'), 3000);
  }

  updateSummary(sender: string, subject: string, snippet: string): void {
    // console.log(this.summaryEl)
    const timestamp = new Date().toLocaleTimeString();
    this.summaryEl.textContent += `\n[${timestamp}] ${subject}: ${snippet}`;
    this.summaryEl.scrollTop = this.summaryEl.scrollHeight;
  }

  closeModal(): void {
    this.showModal = false;
    this.highlightElement('Event_1jibjer');
  }

  injectCanvasHighlightStyles(): void {
  const container = this.bpmnViewer?.nativeElement;
  const style = document.createElement('style');
  style.innerHTML = `
    .djs-element.highlight .djs-visual > * {
      stroke: orange !important;

    }

    .djs-element.highlight polygon {
      fill: #fff8e1 !important;
      stroke: orange !important;
      stroke-width: 4px !important;
    }

    .djs-element.highlight circle {
      fill: #fff8e1 !important;
      stroke: orange !important;
    }
  `;
  container.querySelector('svg')?.appendChild(style);
}


}
