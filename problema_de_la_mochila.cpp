
// a. Llevaria los articulos 1 , 2 , 3 con pesos 6 , 10 , 14 con un beneficio de 48$

//b: 
#include <bits/stdc++.h>
using namespace std;
  
struct Producto
{
    float peso;
    int valor;
};
  
struct Node
{
    int nivel, beneficio, poda;
    float peso;
};
  

bool comparacion(Producto a, Producto b)
{
    double r1 = (double)a.valor / a.peso;
    double r2 = (double)b.valor / b.peso;
    return r1 > r2;
}
  
int poda(Node u, int n, int W, Producto arr[])
{
   
    if (u.peso >= W)
        return 0;
  
    int profit_bound = u.beneficio;
  

    int j = u.nivel + 1;
    int totweight = u.peso;
  
    while ((j < n) && (totweight + arr[j].peso <= W))
    {
        totweight    += arr[j].peso;
        profit_bound += arr[j].valor;
        j++;
    }
  
    if (j < n)
        profit_bound += (W - totweight) * arr[j].valor /
                                         arr[j].peso;
  
    return profit_bound;
}
  
int knapsack(int W, Producto arr[], int n)
{
    sort(arr, arr + n, comparacion
);
  
    queue<Node> Q;
    Node u, v;
  
    u.nivel = -1;
    u.beneficio = u.peso = 0;
    Q.push(u);
  
    int beneficioMax = 0;
    while (!Q.empty())
    {
        u = Q.front();
        Q.pop();
  
        if (u.nivel == -1)
            v.nivel = 0;
  
        if (u.nivel == n-1)
            continue;
  
        v.nivel = u.nivel + 1;
  

        v.peso = u.peso + arr[v.nivel].peso;
        v.beneficio = u.beneficio + arr[v.nivel].valor;
  
   
        if (v.peso <= W && v.beneficio > beneficioMax)
            beneficioMax = v.beneficio;
  
        v.poda = poda(v, n, W, arr);
  
        if (v.poda > beneficioMax)
            Q.push(v);
  
        v.peso = u.peso;
        v.beneficio = u.beneficio;
        v.poda = poda(v, n, W, arr);
        if (v.poda > beneficioMax)
           
            Q.push(v);
    }
  
    return beneficioMax;
}
  
int main()
{
    int W = 30;
    Producto arr[] = {{6, 12}, {10, 16}, {14,20},
                  {18, 24}};
    int n = 4;
  
    cout << "El beneficio maximo sera = "
         << knapsack(W, arr, n);
  
    return 0;
}