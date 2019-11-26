import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BOT_URL = 'http://www.mocky.io/v2/5cee37a5300000253a6e99af';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  public getBotMessage() {
    return this.http.get(BOT_URL)
  }
}
