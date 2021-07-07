import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isFixedNavbar = false;

  @HostBinding('class.navbar-opend') navbarOpened = false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])

  onWindowScroll(){
    const offset = window.pageYOffset  || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if(offset > 0){
      this.isFixedNavbar = true;
    }else{
      this.isFixedNavbar = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu(){
    this.navbarOpened = !this.navbarOpened;
  }
}
