export class Solution {
    algorithm: string;

    constructor(algorithm: string) {
        this.algorithm = algorithm;
    }

    solve(): void {
        if (this.algorithm === "dijstra") {
            this.dijstra();
        }
    }

    dijstra(): void {}
}
