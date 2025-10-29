import { Component, Input } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { FormGroup } from '@angular/forms';


export interface OrgChartNode {
  id: string;
  name: string;
  title: string;
  company?: string;
  imageUrl?: string;
  children?: OrgChartNode[];
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input() item_1:any = '';

 // Sample data based on the reference image
 orgChartData: OrgChartNode = {
  id: '1',
  name: 'Sundar Pichai',
  title: 'Chief Executive Officer',
  imageUrl: 'assets/avatars/sundar-pichai.jpg',
  children: [
    {
      id: '2',
      name: 'Thomas Kurian',
      title: 'CEO',
      company: 'Google Cloud',
      imageUrl: 'assets/avatars/thomas-kurian.jpg',
      children: [
        {
          id: '3',
          name: 'Beau Avril',
          title: 'Global Head of Business Operations',
          imageUrl: 'assets/avatars/beau-avril.jpg',
          children: []
        }
      ]
    },
    {
      id: '4',
      name: 'Susan Wojcicki',
      title: 'CEO',
      company: 'YouTube',
      imageUrl: 'assets/avatars/susan-wojcicki.jpg',
      children: [
        {
          id: '5',
          name: 'Tara Walpert Levy',
          title: 'VP, Agency and Brand Solutions',
          imageUrl: 'assets/avatars/tara-walpert-levy.jpg',
          children: []
        },
        {
          id: '6',
          name: 'Ariel Bardin',
          title: 'VP, Product Management',
          imageUrl: 'assets/avatars/ariel-bardin.jpg',
          children: []
        }
      ]
    },
    {
      id: '7',
      name: 'Jeff Dean',
      title: 'Head of Artificial Intelligence',
      imageUrl: 'assets/avatars/jeff-dean.jpg',
      children: []
    },
    {
      id: '8',
      name: 'David Feinberg',
      title: 'CEO',
      company: 'Google Health',
      imageUrl: 'assets/avatars/david-feinberg.jpg',
      children: []
    }
  ]
};

constructor() { }

ngOnInit(): void {
  // You could fetch real organization data from an API here
  console.log("test",this.item_1);
}

/**
 * Dynamically get avatar image or fallback to initials if no image exists
 */
getAvatar(node: OrgChartNode): string {
  if (node.imageUrl) {
    return node.imageUrl;
  }
  return this.getInitials(node.name);
}

/**
 * Get initials from name for avatar fallback
 */
getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

/**
 * Determine if a node has children
 */
hasChildren(node: OrgChartNode): boolean {
  return !!node && Array.isArray(node.children) && node.children.length > 0;
}
}
