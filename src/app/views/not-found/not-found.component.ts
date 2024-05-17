import { Component } from '@angular/core';
import { SharedModule } from 'src/common/common.module';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class NotFoundComponent {

}
