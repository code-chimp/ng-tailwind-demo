import { Component, computed, Input, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

import {
  type ButtonSize,
  ButtonStyles,
  type ButtonType,
  type ButtonVariant,
} from '@app/components/ui/button/button-styles';

@Component({
  selector: 'button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  host: {
    '[type]': 'type',
    '[class]': 'classes()',
  },
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';

  classes = computed(() => {
    // tailwind merge will clean up any conflicts
    return twMerge(ButtonStyles({ variant: this.variant, size: this.size }));
  });
}
