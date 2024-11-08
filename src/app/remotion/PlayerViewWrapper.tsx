import {AfterViewInit, Component, effect, ElementRef, EventEmitter, Input, OnDestroy, Output, signal, Signal, ViewChild, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import React from 'react';
import {createRoot, Root} from "react-dom/client";
import {PlayerRef} from "@remotion/player";
import {myCompSchema, PlayerView} from "./PlayerView";
import {z} from "zod";

const rootDomID: string = "reactCounterWrapperId";

@Component({
  selector: 'app-player-view',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div id="${rootDomID}" #${rootDomID}></div>`,
})
export class PlayerViewWrapper implements AfterViewInit, OnDestroy {
  @ViewChild(rootDomID, {static: false}) containerRef: ElementRef | undefined;
  @Input({required: true}) data: Signal<z.infer<typeof myCompSchema>> = signal({
    titleText: "Welcome to Remotion",
    titleColor: "#000000",
    logoColor1: "#91EAE4",
    logoColor2: "#86A8E7",
  })
  @Output() onPaused = new EventEmitter<void>
  playerRef: WritableSignal<PlayerRef | undefined> = signal(undefined);

  private root?: Root

  constructor() {
    effect(() => {
      this.render()
    })
  }

  ngAfterViewInit() {
    this.root = createRoot(this.getRootDomNode())
    this.render();
    this.playerRef()?.play()
  }

  ngOnDestroy(): void {
    this.root?.unmount()
  }

  private getRootDomNode() {
    if (!this.containerRef || !this.containerRef.nativeElement) {
      throw new Error("Cannot get root element. This should not happen.");
    }
    return this.containerRef.nativeElement;
  }

  protected render() {
    if (!this.containerRef || !this.containerRef.nativeElement) return;
    this.root?.render(<PlayerView playerRefInstance={this.playerRef} data={this.data()} onPaused={() => this.onPaused.emit()} />)
  }
}
