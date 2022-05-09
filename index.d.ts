declare module 'time-gaps' {
    type Interval = {
        from: string;
        to: string;
    }

    export function merge(newIntervals: Interval[], oldIntervals: Interval[]): Interval[];
}
