export type RiskLevel='低'|'中'|'高';
export type Airport={ name:string; score:number; category:string; risk:RiskLevel; tested:string; price:string; traffic:string };
export type ScoreSet={ stability:number; peakHours:number; speed:number; nodeQuality:number; streaming:number; value:number; support:number; transparency:number };
