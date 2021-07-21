import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
    //singleton - uma classe que tem uma única instancia!
})
export class ProductService {

    baseUrl = 'http://localhost:3001/products'

    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        })
    }

    create(product: Product): Observable<Product> {
        //com isso podemos interagir com o backend atraves de uma requisição HTTP
        //essa requisição é do tipo POST, pois queremos inserir um dado ou mais dados
        //retornando um observable
        return this.http.post<Product>(this.baseUrl, product).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        )
    }


    read(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        )
    }

    reaById(id: number): Observable<Product> {
        const url = `${this.baseUrl}/${id}`
        return this.http.get<Product>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        )
    }

    update(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/${product.id}`
        return this.http.put<Product>(url, product).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        )
    }

    delete(id: number): Observable<Product> {
        const url = `${this.baseUrl}/${id}`
        return this.http.delete<Product>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.showMessage('Ocorreu um erro', true)
        return EMPTY;
    }
}
