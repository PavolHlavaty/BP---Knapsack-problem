# Knapsack solver 

## Description

This repository offers pure client-side web application for solving three different variations of knapsack problems:
* Value Independent Knapsack Problem (VIKP)
* Multiple Knapsack Problem (MKP)
* Value Independent Multiple Knapsack Problem (VIMKP)

Moreover this tool offers multiple alghoritms to solve these three problems and can easily be used to test and compare implemented algorithms. This repository offers following algorithms:
* For VIKP: 
    * Greedy algorithm
    * Dynamic programming
    * Branch & Bound algorithm
* For MKP:
    * Greedy algorithm
    * Branch & Bound algorithm ("Bound & Bound" by Martello and Toth)
* For VIMKP:
    * Greedy algorithm
    * Branch & Bound algorithm ("Bound & Bound" by Martello and Toth)
    * Quick Forward Lookup (QFL) algorithm

## Manual

### How to run

As this tool is implemented as purely client-side web application, all you need to run it is to open ``index.html`` in some modern web browser which supports ECMAScript 2017. To run desired algorithm to solve knapsack problem sipmly fill in form and click "Solve". 

### Datasets' structure 

#### Dataset for items

Use simple plain text file where each line represents one item with its weight and profit (profit is ignored when solving value independent knapsacks). Use following format without any spaces.

```
w1,p1
...
wn,pn
```
Where:
* w - item's weight
* p - item's profit
* n - number of items 

#### Dataset for knapsacks 

Use simple plain text file where each knapsacks' capacity is on new line. Use following format without any spaces.

```
c1
...
cm
```
Where:
* c - knapsack's capacity
* m - number of knapsacks

### Solution interpretation

* Profit - total profit gained from items packed in all knapsacks
* Total load - total load of all knapsacks in %
* Time in ms - computation time in milliseconds 
* Knapsacks - this section displays all knapsacks with their index and initial capacity. Donut charts display each knapsack's load.
* Items - this section displays all items with their index, weight, profit and knapsack that they are assigned to. Knapsack equals -1 if item is not assigned to any knapsack.

#### Important note

Displayed solution is also logged to console and moreover with QFL algorithm this log contains additional data about solution found after first (random) phase of algorithm. 