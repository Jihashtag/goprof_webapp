import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { RouterModule } as NativeScriptRouterModule from '@angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';

import { HomeComponent } from './pages/home/home.component';
import { LiveComponent } from './pages/live/live.component';
import { LoginComponent } from './pages/login/login.component';
import { CoursComponent } from './pages/cours/cours.component';
import { PlayerComponent } from './pages/player/player.component';
import { AgendaComponent } from './pages/agenda/agenda.component';

/* Game Components*/
// import { GameMenuComponent } from './pages/gameMenu/gameMenu.component';
// import { GameLevelComponent } from './pages/gameLevel/gameLevel.component';
import { GameComponent } from './pages/game/game.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'live', component: LiveComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cours', component: CoursComponent },
    { path: 'player', component: PlayerComponent },
    { path: 'game', component: GameComponent },
    { path: 'agenda', component: AgendaComponent }
];
/*    { path: 'gamemenu', component: GameMenuComponent },
//    { path: 'gamelevel', component: GameLevelComponent },*/

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const navigatableComponents = [
 HomeComponent, LiveComponent, LoginComponent, CoursComponent, PlayerComponent, AgendaComponent/* , GameMenuComponent, GameLevelComponent*/, GameComponent
];
