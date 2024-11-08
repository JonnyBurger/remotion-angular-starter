import React, {useEffect} from "react";
import {Player, PlayerRef} from "@remotion/player";
import {z} from "zod";
import {HelloWorld} from "./HelloWorld";
import {zColor} from "@remotion/zod-types";
import {WritableSignal} from "@angular/core";

const styles = {

}

export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
  logoColor1: zColor(),
  logoColor2: zColor(),
})

export const PlayerView: React.FC<{ data: z.infer<typeof myCompSchema>, playerRefInstance: WritableSignal<PlayerRef | undefined>, onPaused?: () => void }> = ({data, playerRefInstance, onPaused}) => {

  const playerRef: React.RefObject<PlayerRef> = React.createRef()

  useEffect(() => {
    if (playerRef.current) {
      playerRefInstance.set(playerRef.current)

      // add callback when player pauses
      playerRef.current.addEventListener('pause', () => {
        onPaused?.()
      })
    }
  }, [])
  return <Player
    ref={playerRef}
    component={HelloWorld}
    durationInFrames={150}
    fps={30}
    compositionHeight={1080}
    compositionWidth={1920}
    inputProps={data}
    style={{width: '100%'}}
    controls
  />
}
