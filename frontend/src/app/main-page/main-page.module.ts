import { NgModule } from '@angular/core';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { CardColumnComponent } from '@mainPageComponents/card-column/card-column.component';
import { StoreModule } from '@ngrx/store';
import * as mainPage from '@mainPageStore/index';
import { EffectsModule } from '@ngrx/effects';
import { MainPageEffects } from '@mainPageEffects/main-page.effects';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [MainPageComponent, CardColumnComponent, MainHeaderComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    DragDropModule,
    StoreModule.forFeature('app', mainPage.reducer),
    EffectsModule.forFeature([MainPageEffects]),
  ],
  providers: [],
})
export class MainPageModule {}
