import { trigger, animate, state, style, transition } from '@angular/animations';

export function visibility() {
    return trigger('visibility',[
        state('shown',style({
          transform: 'scale(1.0)',
          opacity: 1
        })),
        state('hidden',style({
          transform: 'scale(0.65)',
          opacity: 0
        })),
        transition('* => *', animate('0.6s ease-in-out'))
      ])
}
export function flyInOut() {
    return trigger('flyInOut',[
        state('*',style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition(':enter',[
            style({transform: 'translateX(-100%)',opacity: 0,}),
            animate('600ms 400ms ease-in'),
        ]),
        transition(':leave',[
            animate('600ms ease-out',style({transform: 'translateX(100%)',opacity: 0}))
        ])
    ])
}
export function expand() {
    return trigger('expand',[
        state('*',style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition(':enter',[
            style({transform: 'translateY(-60%)',opacity: 0,}),
            animate('300ms ease-in',style({
                opacity: 1,
                transform: 'translateY(0)'
            }))
        ])
    ])
}