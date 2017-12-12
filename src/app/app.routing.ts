import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { RouterModule } as NativeScriptRouterModule from '@angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';

import { HomeComponent } from './pages/home/home.component';
import { ConversationsComponent } from "./pages/conversations/conversations.component";
import { NotificationsComponent } from "./pages/notifications/notifications.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { LiveComponent } from './pages/live/live.component';
import { LoginComponent } from './pages/login/login.component';
import { CoursComponent } from './pages/cours/cours.component';
import { PlayerComponent } from './pages/player/player.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ProfsComponent } from "./pages/profs/profs.component";
import { ProfComponent } from "./pages/prof/prof.component";
import { ProfagendaComponent } from "./pages/profagenda/profagenda.component";
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
    { path: 'agenda', component: AgendaComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'settings', component: SettingsComponent },
//    { path: 'creditcards', component: CreditcardsComponent },
    { path: 'conversations', component: ConversationsComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'profs', component: ProfsComponent },
    { path: 'prof', component: ProfComponent },
    { path: 'profagenda', component: ProfagendaComponent }
];
/*    { path: 'gamemenu', component: GameMenuComponent },
//    { path: 'gamelevel', component: GameLevelComponent },*/

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const navigatableComponents = [
 HomeComponent, LiveComponent, ProfagendaComponent, ProfsComponent, ProfComponent, LoginComponent,MessagesComponent, CoursComponent, PlayerComponent, /*GameMenuComponent, GameLevelComponent,*/ GameComponent, AgendaComponent, NotificationsComponent, SettingsComponent,ConversationsComponent/*,CreditcardsComponent*/];
