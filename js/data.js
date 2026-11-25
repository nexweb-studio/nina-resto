/* ===== CONFIGURACIÓN EDITABLE ===== */
var CFG={tel:"",telTexto:"Pedidos al 684030 (confirmar número completo)",sinPrecio:"Consultar precio"};
/* foto: ruta o URL de la imagen (ej. "img/promo1.jpg"). Vacío = marcador. precio:null = Consultar precio */
var PROMOS=[
{id:"p1",f:"assets/images/promo-01.svg",n:"Promo 1",e:"🍕",p:27000,i:["1 pizza muzza","1 pizza especial","1 papa"]},
{id:"p2",f:"assets/images/promo-02.svg",n:"Promo 2",e:"🥟",p:27000,i:["½ docena de empanadas de carne","½ docena de empanadas de jamón y queso","1 papa"],d:"Cantidad a confirmar según la gráfica original."},
{id:"p3",f:"assets/images/promo-03.svg",n:"Promo 3",e:"🥪",p:33000,i:["1 sándwich de mila en pan francés","1 sándwich de mila en pan torpedo","1 papa"]},
{id:"p4",f:"assets/images/promo-04.svg",n:"Promo 4",e:"🍔",p:27000,i:["4 hamburguesas especiales","1 papa"]},
{id:"p5",f:"assets/images/promo-05.svg",n:"Promo 5",e:"🍕",p:27000,i:["1 pizza muzza","1 docena de empanadas de carne o JyQ","1 papa"],v:["Empanadas de carne","Empanadas de jamón y queso"]},
{id:"p6",f:"assets/images/promo-06.svg",n:"Promo 6",e:"🥪",p:27000,i:["1 sándwich de milanesa en pan francés","1 triple de pollo","1 papa"]},
{id:"p7",f:"assets/images/promo-07.svg",n:"Promo 7",e:"🥪",p:32000,i:["1 sándwich de milanesa en pan francés","1 sándwich de lomo en pan francés","1 papa"]},
{id:"p8",f:"assets/images/promo-08.svg",n:"Promo 8",e:"🥪",p:27000,i:["1 triple de pollo","1 triple de verdura + tostado","1 papa"]},
{id:"p9",f:"assets/images/promo-09.svg",n:"Promo 9",e:"🍽️",p:27000,i:["1 picada de milanesa","1 pizza especial","1 papa"]},
{id:"p10",f:"assets/images/promo-10.svg",n:"Promo 10",e:"🌮",p:27000,i:["1 bandeja de tacos","2 hamburguesas comunes","1 papa"]}
];
var MAYO=["Mayonesa casera","Mayonesa natura"];
var CARTA=[
{c:"Pizzas",e:"🍕",x:[{id:"c1",f:"assets/images/pizza-muzzarella.svg",n:"Pizza muzzarella",d:"Pizza de muzzarella.",p:null},{id:"c2",f:"assets/images/pizza-especial.svg",n:"Pizza especial",d:"Con ingredientes especiales de la casa.",p:null}]},
{c:"Empanadas",e:"🥟",x:[{id:"c3",f:"assets/images/empanadas-carne.svg",n:"Empanadas de carne",d:"Caseras, de carne.",p:null},{id:"c4",f:"assets/images/empanadas-jyq.svg",n:"Empanadas de jamón y queso",d:"Caseras, de jamón y queso.",p:null}]},
{c:"Hamburguesas",e:"🍔",x:[{id:"c5",f:"assets/images/hamburguesa-comun.svg",n:"Hamburguesa común",d:"Con mayonesa casera.",p:null,v:MAYO},{id:"c6",f:"assets/images/hamburguesa-especial.svg",n:"Hamburguesa especial",d:"Con mayonesa casera.",p:null,v:MAYO}]},
{c:"Sándwiches",e:"🥪",x:[{id:"c7",f:"assets/images/sandwich-milanesa-frances.svg",n:"Milanesa en pan francés",d:"Sándwich de milanesa en pan francés.",p:null,v:MAYO},{id:"c8",f:"assets/images/sandwich-milanesa-torpedo.svg",n:"Milanesa en pan torpedo",d:"Sándwich de milanesa en pan torpedo.",p:null,v:MAYO}]},
{c:"Triples",e:"🥪",x:[{id:"c9",f:"assets/images/triple-pollo.svg",n:"Triple de pollo",d:"Sándwich triple de pollo.",p:null},{id:"c10",f:"assets/images/triple-verdura.svg",n:"Triple de verdura",d:"Sándwich triple de verdura.",p:null}]},
{c:"Lomos",e:"🥩",x:[{id:"c11",f:"assets/images/lomo.svg",n:"Sándwich de lomo",d:"Lomo en pan francés.",p:null,v:MAYO}]},
{c:"Picadas",e:"🍽️",x:[{id:"c12",f:"assets/images/picada-milanesa.svg",n:"Picada de milanesa",d:"Para compartir.",p:null}]},
{c:"Tacos",e:"🌮",x:[{id:"c13",f:"assets/images/tacos.svg",n:"Bandeja de tacos",d:"Bandeja de tacos.",p:null}]},
{c:"Papas fritas",e:"🍟",x:[{id:"c14",f:"assets/images/papas-fritas.svg",n:"Papas fritas",d:"Porción de papas fritas.",p:null}]}
];
