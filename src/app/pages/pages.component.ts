import {Component, ViewEncapsulation} from '@angular/core';
import { FirebaseService } from '../app-firebase.service';
import { MENU } from '../app.menu';
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com">Akveo</a> 2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  modules: any[];
  constructor(private fs: FirebaseService) {
  }

  ngOnInit() {
    this.fs.db.ref('modules').on('value', (snapshot) => {
      this.modules = snapshot.val();
      console.log(MENU);
      console.log(this.modules);
      for (var it = 0; it < this.modules.length; it++){
        MENU[0].children.push(this.modules[it].menuObj);
        console.log(this.modules[it].menuObj);
        console.log(it);
      }
    })
  }
}
