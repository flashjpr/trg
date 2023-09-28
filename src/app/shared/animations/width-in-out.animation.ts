import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const widthInOut: AnimationTriggerMetadata = trigger('widthInOut', [
  transition('void => true', [
    style({ width: 0, overflow: 'hidden', whiteSpace: 'nowrap' }),
    animate('150ms ease-in-out', style({ width: '*' })),
  ]),
  transition('true => void', [
    animate('150ms ease-in-out', style({ width: 0, overflow: 'hidden', whiteSpace: 'nowrap' })),
  ]),
]);
