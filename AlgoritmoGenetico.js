const populationSize = 1000
const genes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890, .-;:_!#%&/()=?@${[]}"
const target = "Quantas geracoes demora pra decodificar isso aqui?"

class Individual{
    constructor(gene){
        if(gene == undefined){
            this.chromosome = this.CreateGnome()
        }else{
            this.chromosome = gene
        }
        this.fitness = this.CallFitness()
    }

    MutateGenes(){
        const gene = genes[ Math.floor(Math.random() * genes.length)]
        return gene
    }
    CreateGnome(){
        const gnomeLenth = target.length
        let newGnome = ""
        for(let i = 0 ; i < gnomeLenth; i++){
            newGnome += this.MutateGenes()
        }
        return newGnome
    }
    Mate(par2){
        let childChromosome = ""
        for(let pos = 0; pos < this.chromosome.length; pos++){
            const prob = Math.random()
            if(prob < 0.45){
                childChromosome += this.chromosome[pos] 
            }
            else if(prob < 0.90){
                childChromosome += par2.chromosome[pos]
            }
            else{
                childChromosome += this.MutateGenes()
            }
        }
        const child = new Individual(childChromosome)
        return child
    }
    CallFitness(){
        let fitness = 0
        for(var i = 0; i < target.length; i++){
            if(this.chromosome[i] != target[i]){
                fitness += 1
            }
        }
        return fitness
    }
}
function Main(){
    let generation = 1
    let found = false
    let population = []
    for(var i = 0; i < populationSize; i++){
        let individual = new Individual()
        population.push(individual)
    }
    while(!found){
        population = population.sort(function(a,b){
            return a.fitness < b.fitness ? -1 : a.fitness > b.fitness ? 1 : 0
        })
        if(population[0].fitness == 0){
            found = true
            break
        }
        let newGeneretion = []

        let a = (10*populationSize)/100
        for(var t = 0; t < a; t++){
            newGeneretion.push(population[t])
        }


        let s = (90*populationSize)/100
        for(var t = 0 ; t < s; t++){
            let parent1 = population[ Math.floor(Math.random() * 50)]
            let parent2 = population[ Math.floor(Math.random() * 50)]
            let child = parent1.Mate(parent2)
            newGeneretion.push(child)
        }
        population = newGeneretion
        console.log(`Geracao: ${generation} | Cromossomo: ${population[0].chromosome} | Fitness: ${population[0].fitness} `)
        generation += 1
        if(generation == 100000){
            break
        }
    }
    console.log(`Geracao: ${generation} | Cromossomo: ${population[0].chromosome} | Fitness: ${population[0].fitness} `)
}
Main()