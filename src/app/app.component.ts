import {Component, effect, inject, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {PlayerViewWrapper} from "./remotion/PlayerViewWrapper";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PlayerViewWrapper, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  private readonly formBuilder = inject(NonNullableFormBuilder)
  @ViewChild('player') player?: PlayerViewWrapper;

  form = this.formBuilder.group({
    titleText: ['Welcome to Remotion', Validators.required],
  })

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(changes => this.data.update(d => ({...d, titleText: this.form.controls.titleText.value})))

    effect(() => {
      this.player?.playerRef()?.seekTo(20)
      this.player?.playerRef()?.play()
    });
  }

  data = signal({
    durationInFrames: 150,
    titleText: "Welcome to Remotion",
    titleColor: "#000000",
    logoColor1: "#91EAE4",
    logoColor2: "#86A8E7",
  })

  playerPaused() {
    console.log('player has paused')
  }
}
