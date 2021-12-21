let autos = require('./autos');

let concesionaria = {
    autos : autos,
    buscarAuto : function (patente){
        let autoEncontrado = autos.find(auto => auto.patente == patente);
        if (autoEncontrado){
            return autoEncontrado;
        }else{
            return null;
        }
        
        

        //console.log(autoEncontrado[0].patente);
    },
    venderAuto : function (patente){
        let auto = this.buscarAuto(patente);
        if(auto.vendido == false){
            auto.vendido = true;
            return auto;
        }
    },
    autosParaLaVenta : function (){
        return autos.filter(auto => auto.vendido == false)
    },
    autosNuevos : function (){
        let autosParaLaVenta = this.autosParaLaVenta();
        return autosParaLaVenta.filter(auto => auto.km <= 100);
    },
    listaDeVentas: function (){
        let autosVendidos = autos.filter(auto => auto.vendido == true)
        return autosVendidos.map(auto => auto.precio)
    },
    totalDeVentas : function () {
        let vendidos = this.listaDeVentas();
        let total = vendidos.length !== 0 ? vendidos.reduce((acum,num)=>acum+num):0;
        return total
    },
    puedeComprar: function (auto,persona){
        let montoCuota = auto.precio / auto.cuotas;
        if(auto.precio <= persona.capacidadDePagoTotal && persona.capacidadDePagoEnCuotas >= montoCuota ){
            return true
        } else {
            return false
        }
    },
    /* autosQuePuedeComprar: function (persona){
        let autosDisponibles = this.autosParaLaVenta();
        //console.log(autosDisponibles[0] +" "+autosDisponibles[1])
        let autosQuePuedeComprar = [];
        autosDisponibles.forEach(auto=>{
            if(this.puedeComprar(auto,persona)){
                autosQuePuedeComprar.push(auto)
            }
        return autosQuePuedeComprar;    
        });
    }, */
    autosQuePuedeComprar: function (persona){
        let autosDisponibles = this.autosParaLaVenta();
        let autosQuePuedeComprar = [];
        autosDisponibles.forEach(auto=>this.puedeComprar(auto,persona) ? autosQuePuedeComprar.push(auto):"");
            
        return autosQuePuedeComprar;    
        
    },
}
console.log(concesionaria.buscarAuto("APL123"));
console.log(concesionaria.venderAuto("APL123"));
console.log(concesionaria.autosParaLaVenta());
console.log(concesionaria.autosNuevos());
//console.log(concesionaria.autosVendidos());
console.log(concesionaria.puedeComprar(autos[1],{
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
    }));

console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    
console.log(concesionaria.autosQuePuedeComprar({
    capacidadDePagoEnCuotas: 30000, 
    capacidadDePagoTotal: 100000000 
}));
console.log(concesionaria.autosQuePuedeComprar({
    capacidadDePagoEnCuotas: 7200, 
    capacidadDePagoTotal: 100000000 
}));