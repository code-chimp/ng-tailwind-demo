import { Component, computed, Input, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

import {
  type ButtonProps,
  ButtonStyles,
  type ButtonType,
} from '@app/components/ui/button/button-props';

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
  props = input<ButtonProps>();

  @Input() type: ButtonType = 'button';

  classes = computed(() => {
    let classes = '';

    if (this.props()) {
      const { variant, size } = this.props()!;
      classes = ButtonStyles({ variant, size });
    } else {
      // will pull the default styles from cva
      classes = ButtonStyles();
    }

    // tailwind merge will clean up any conflicts
    return twMerge(classes);
  });
}
