import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_URL_DATA } from '@core/constants/routes';
import { CustomRouterReuseStrategy } from 'src/app/custom-router-reuse.strategy';

import { Tab } from '../model';
import { TabManagerService } from '../tab-manager.service';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent implements OnInit {
  tabs$ = this.tabManager.openedTabs$;

  constructor(private tabManager: TabManagerService, private router: Router) {}

  ngOnInit(): void {}

  onHomeButtonClicked(): void {
    this.navigateHome();
  }

  async onTabClosed(tab: Tab): Promise<void> {
    this.tabManager.removeTab(tab);
    await this.navigateHome();

    this.deleteStoredRoute(tab.url);
  }

  private navigateHome(): Promise<boolean> {
    return this.router.navigate([PATH_URL_DATA.urlUserList]);
  }

  private deleteStoredRoute(url: string): void {
    const strategy = this.router
      .routeReuseStrategy as CustomRouterReuseStrategy;
    strategy.deleteStoredRoute(url);
  }
}
