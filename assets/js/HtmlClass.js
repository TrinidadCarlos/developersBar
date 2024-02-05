import { FuncsClass } from "./FuncsClass.js";
import { AlertsClass } from "./AlertsClass.js";
import { ApiClass } from "./ApiClass.js";
import { statusPage, navOptions } from "./vars.js";


const fc = new FuncsClass();
const ac = new AlertsClass();



const {isNil, getById, isEmptyArr, createElementHtml, addFavorite, getFavorites, deleteFromFavorites} = fc;
const {simpleAlert} = ac;

class HtmlClass {
    constructor(){}

    showHideLoaderLogin (data = {}) {

        if (isNil(data.loginElement) === false && isNil(data.fullLoader) === false) {
                if (data.show === true) {   
                    // se oculta el login fake
                    data.loginElement.classList.add('d-none');
                    data.fullLoader.classList.remove('d-none');
                } else {
                    // se muestra el login fake
                    data.loginElement.classList.remove('d-none');
                    data.fullLoader.classList.add('d-none');                    
                }
            }
    }

    showHideLoader(data = {}) {
        if (isNil(data.fullLoader) === false) {
                if (data.show === true) {   
                    // se muestra main
                    data.fullLoader.classList.remove('d-none');
                } else {
                    // se oculta main
                    data.fullLoader.classList.add('d-none');                    
                }
            }
    }

    showHideLoaderMain (data = {}) {
        if (isNil(data.mainContent) === false && isNil(data.fullLoader) === false) {
                if (data.show === true) {   
                    // se muestra main
                    data.mainContent.classList.remove('d-none');
                    data.fullLoader.classList.add('d-none');
                    localStorage.setItem('statusPage', statusPage.in);

                } else {
                    // se oculta main
                    data.mainContent.classList.add('d-none');
                    data.fullLoader.classList.remove('d-none');                    
                }
            }
    }

    showHideMainLogin (data = {}) {
        if (isNil(data.mainContent) === false && isNil(data.loginElement) === false) {
                if (data.show === true) {   
                    // se muestra main
                    data.mainContent.classList.remove('d-none');
                    data.loginElement.classList.add('d-none');
                } else {
                    // se oculta main
                    data.mainContent.classList.add('d-none');
                    data.loginElement.classList.remove('d-none');                    
                }
            }
    }

    changePageTitle (data = '') {
        const pageTitle = getById('pageTitle');
        const iconTitlePage = getById('iconTitlePage');
        iconTitlePage.innerHTML = '';

        if(isNil(pageTitle) === false && isNil(data?.title) === false ){
            pageTitle.textContent = data.title;
        }
        if(isNil(iconTitlePage) === false){
            
            const i = createElementHtml({
                element: 'i',
                att: [
                    {
                        att: 'class',
                        info: `${data.icon} text-white mr-2`
                    }
                ]
            });
            iconTitlePage.append(i);
        }

    }

    showHideAlphabet (show = false) {   

        const alphabetElement = getById('alphabetContainer');
        if (isNil(alphabetElement) === false) {
            if (show === true ) {
                alphabetElement.classList.remove('d-none');
            } else {
                alphabetElement.classList.add('d-none');
            }
        }
    }
  
    cardsElements (cocktails = [], isFromFavorites = false) {
        // si existe en favoritos algo.. se le agrega a la card el icono de favorito... (esto es diferente a si se manda como true el isFromFavorites)
            let favoritesStorageArr = getFavorites();
            let favoritesinStorageBool = false;
            if (isNil(favoritesStorageArr) === false) {
                favoritesStorageArr = JSON.parse(favoritesStorageArr);
            }
        //



        let elementsArr = [];

        cocktails.forEach(c => {

            


            const div1 = createElementHtml({
                element:'div', 
                att: [
                    {
                        att: 'class',
                        info: 'col-md-2 card-block'
                     }
                ]
            });

          

            const img = createElementHtml({
                element: 'img',
                att: [
                    {
                        att: 'src',
                        info: c.strDrinkThumb
                    },
                    {
                        att: 'id',
                        info: 'imgCardCocktail'
                    },
                ]
            });

            const p = createElementHtml({
                element: 'p',
                att: [
                    {
                        att: 'class',
                        info: 'mb-0 text-center text-white drink-title'
                    },
                    {
                        att: 'id',
                        info: 'titleCardCocktail'
                    },
                ]
            });
            
            const div2 = createElementHtml({
                element: 'div',
                att: [
                    {
                        att: 'class',
                        info: 'text-start mb-5'
                    },
                ]
            });
            
            // drink category
            const p2 = createElementHtml({
                element: 'p',
                att: [
                    {
                        att: 'class',
                        info: 'mb-0  text-white drink-info'
                    },
                ]
            });

            const span = createElementHtml({
                element: 'span',
                att: [
                    {
                        att: 'id',
                        info: 'drinkCategory'
                    },
                ]
            });
            
            // alcoholic drink
            const p3 = createElementHtml({
                element: 'p',
                att: [
                    {
                        att: 'class',
                        info: 'mb-0  text-white drink-info'
                    },
                ]
            });
            
            const span2 = createElementHtml({
                element: 'span',
                att: [
                    {
                        att: 'id',
                        info: 'drinkCategory'
                    },
                ]
            });           

            const div3 = createElementHtml({
                element: 'div',
                att: [
                    {
                        att: 'class',
                        info: 'text-center mt-2 card-footer'
                    },
                ]
            });

            const button = createElementHtml({
                element: 'button',
                att: [
                    {
                        att: 'class',
                        info: 'btn btn-outline-warning'
                    },
                ]
            });
            

            const i = createElementHtml({
                element: 'i',
                att: [
                    {
                        att: 'class',
                        info: 'fas fa-eye mr-2'
                    },
                ]
            });


            // revisamos si existe en favoritos... DESDE CUALQUIER OTRO LUGAR QUE NO SEA EL LINK "FAVORITOS" DEL MENÚ... PARA ESE
            // CASO SE USA EL isFromFavorites de abajo...
            if (isNil(favoritesStorageArr) === false) {
                favoritesinStorageBool = favoritesStorageArr.some(f => f.idDrink === c.idDrink);
            }

            // POR SI ES MANDADO A CREAR DESDE FAVORITOS
            if (isFromFavorites === true || favoritesinStorageBool === true ) {
                const pFavorite = createElementHtml({
                    element: 'p',
                    att: [
                        {
                            att: 'class',
                            info: 'mb-2 d-flex justify-content-between  f-20'
                         },
                    ]
                });
    
                const iconFavorite = createElementHtml({
                    element: 'i',
                    att: [
                        {
                            att: 'class',
                            info: 'fas fa-heart text-warning'
                         }
                    ]
                });

                const deleteFavorite = createElementHtml({
                    element: 'i',
                    att: [
                        {
                            att: 'class',
                            info: 'fas fa-times text-danger pointer'
                         }
                    ]
                });


                deleteFavorite.onclick = () => {
                    const favoritesUpdated = deleteFromFavorites(c.idDrink);
                     this.showHideLoader({fullLoader: getById('fullLoader'), show: true});
                     
                     setTimeout(() => {
                         
                         const cardsContainer = getById('cardsContainer');
                         this.clearCardsContainer({cardsContainer});
                        
                         if (isFromFavorites === true) {
                            // se muestran solo los que seguardaron en favoritos, no todos los cockteles que existina en favoritos antes de eliminar alguno...
                            this.makeCocktailsCardsHtml(favoritesUpdated, isFromFavorites); // para actualizar la vista...
                            if (favoritesUpdated.length < 1){
                                const linkCocktails = getById(navOptions.cocktails.id);
                                if (isNil(linkCocktails) === false ){
                                    linkCocktails?.click();
                                }
                            }

                        } else {
                            this.makeCocktailsCardsHtml(cocktails, isFromFavorites); // para actualizar la vista...
                        }

                         this.showHideLoader({fullLoader: getById('fullLoader'), show: false});
                     },500);

                };

                pFavorite.appendChild(iconFavorite);
                pFavorite.appendChild(deleteFavorite);
                pFavorite.appendChild(iconFavorite);
                
                div1.appendChild(pFavorite);
            }
            favoritesinStorageBool = false // se regresa a false para que el siguiente valor no se vea afectado

            // asignación de valores
            p.textContent = c.strDrink;
            span.textContent = 'Drink Category: '+  c.strCategory;
            const isAlcoholic = c.strAlcoholic == 'Alcoholic' ? 'Yes' : 'No';
            span2.textContent = 'Alcoholic Drink: ' +  isAlcoholic;
            button.onclick = function() {
                const h = new HtmlClass();
                h.makeModalCocktail(c, cocktails,isFromFavorites);
            }

            
            div1.appendChild(img);
            div1.appendChild(p);

            p2.appendChild(span);
            p3.appendChild(span2);
            div2.appendChild(p2);
            div2.appendChild(p3);

            button.appendChild(i);
            
            div3.appendChild(button);

            div1.appendChild(div2);
            div1.appendChild(div3);
            
            elementsArr.push(div1);
        });

        return elementsArr;
    }

    clearCardsContainer (data = {}) {
        if(isNil(data?.cardsContainer) === false){
            data.cardsContainer.innerHTML = '';
        }
    }
    
    async makeModalCocktail  (cocktail = {}, cocktailsArr = [], isFromFavorites = false) {
        const closeCocktailModal = getById('closeCocktailModal');
        const closeCocktailModalBtn = getById('closeCocktailModalBtn');
        const modalCocktails = getById('modalCocktails');
        const titleImgCocktail = getById('titleImgCocktail');
        const modalCocktailIngContainer = getById('modalCocktailIngContainer');
        const modalCocktailInstructions = getById('modalCocktailInstructions');
        const addFavoriteBtn = getById('addFavoriteBtn');
      

        // el api regresa 15 ingredientes... pero puede que solo tengan 1... los demás son props en null
        let ingredientsArr = [];
        for (let i = 0; i < 15 ; i++) {

            if (isNil(cocktail[`strIngredient${i+1}`]) === true) {
                continue;
            };
            const div = createElementHtml({
                element: 'div',
                att: [
                    {
                        att: 'class',
                        info: 'col-6 col-lg-4 mb-2 mb-lg-3 mb-md-0 d-flex flex-column align-items-center'
                    },
                ]
            });  

            const imgIng = createElementHtml({
                element: 'img',
                att: [
                    {
                        att: 'width',
                        info: '75'
                    },
                    {
                        att: 'class',
                        info: 'img-fluid drink-img'
                    },
                    {
                        att: 'src',
                        // info: ingredientImage?.drinks[0].strDrinkThumb
                        info: `https://www.thecocktaildb.com/images/ingredients/${cocktail[`strIngredient${i+1}`].toLowerCase()}-Small.png`
                    },
                ]
            });  

            const pIngredient = createElementHtml({
                element: 'p',
                att: [
                    {
                        att: 'class',
                        info: 'mb-0 f-15'
                    },
                ]
            });  
            pIngredient.textContent = cocktail[`strIngredient${i+1}`];

            const pMeasure = createElementHtml({
                element: 'p',
                att: [
                    {
                        att: 'class',
                        info: 'mb-0 f-15'
                    },
                ]
            });  
            pMeasure.textContent = '( ' + cocktail[`strMeasure${i+1}`] + ' )';

            div.appendChild(imgIng);
            div.appendChild(pIngredient);
            div.appendChild(pMeasure);
            ingredientsArr.push(div);

        } // fin for
        
        
        const modalCocktailTitle = createElementHtml({
            element: 'h6',
            att: [
                {
                    att: 'class',
                    info: ''
                },
            ]
        });
        modalCocktailTitle.textContent = cocktail.strDrink;
        const img = createElementHtml({
            element: 'img',
            att: [
                {
                    att: 'class',
                    info: 'img-fluid drink-img'
                },
                {
                    att: 'src',
                    info: cocktail.strDrinkThumb
                },
            ]
        });
        modalCocktailInstructions.textContent = cocktail.strInstructions;
        modalCocktailIngContainer.append(...ingredientsArr);

        
        titleImgCocktail.appendChild(modalCocktailTitle);
        titleImgCocktail.appendChild(img);

        modalCocktailIngContainer.appendChild(...ingredientsArr);


        const closeModal = function(){ 
            modalCocktails.classList.add('d-none');
            modalCocktailIngContainer.innerHTML = null;
            titleImgCocktail.innerHTML = null;
         }


         addFavoriteBtn.onclick = () => {
            
            const favoritesUpdated = addFavorite(cocktail);

            if ( favoritesUpdated.length < 1 ) return;
                const cardsContainer = getById('cardsContainer');
                this.clearCardsContainer({cardsContainer});
                this.makeCocktailsCardsHtml(cocktailsArr, isFromFavorites); // para actualizar la vista...
             
        } ;
        closeCocktailModal.onclick = closeModal;
        closeCocktailModalBtn.onclick = closeModal;
        modalCocktails.classList.remove('d-none');


    }

    makeCocktailsCardsHtml (cocktails = [], isFromFavorites = false) {

        if (isNil(cocktails) === true || isEmptyArr(cocktails) === true ) {
            return simpleAlert({
                title: 'Woo!',
                text: 'There is no result. Try another name, please...',
                icon: 'info',
            });
        }
        const cardsContainer = getById('cardsContainer');
        cardsContainer.innerHTML = '';

        const ownClass = new HtmlClass();
        let elementsArr = ownClass.cardsElements(cocktails, isFromFavorites);
       
        cardsContainer.append(...elementsArr);
    }

    async makeIngredientsCardsHtml (cocktails = []) {
        const apiC = new ApiClass();

        if (isNil(cocktails) === true || isEmptyArr(cocktails) === true ) {
            return simpleAlert({
                title: 'Woo!',
                text: 'There is no result. Try another name, please...',
                icon: 'info',
            });
        }

        const response = await apiC.getCocktailByID(cocktails);

        if (isNil(response) === true) {
            return null;
        }


        // SI LA DATA ES CORRECTA Y NO ES NULL O VACIO...
      

        const ownClass = new HtmlClass();
        let elementsArr = ownClass.cardsElements(response);
       
        const cardsContainer = getById('cardsContainer');
        cardsContainer.append(...elementsArr);

        
    }

}

export {HtmlClass};














  // makeCocktailsCardsHtml (cocktails = []) {
    //     let fragment = document.createDocumentFragment();
    //     const templateRegularCards = getById('templateRegularCards').content;


    //     if (isNil(cocktails) === true || isEmptyArr(cocktails) === true ) {
    //         return simpleAlert({
    //             title: 'Woo!',
    //             text: 'There is no result. Try another name, please...',
    //             icon: 'info',
    //         });
    //     }

    //     cocktails.forEach(c => {
    //         templateRegularCards.querySelector('#imgCardCocktail').setAttribute('src', c.strDrinkThumb);
    //         templateRegularCards.querySelector('#titleCardCocktail').textContent = c.strDrink;
    //         templateRegularCards.querySelector('#drinkCategory').textContent = c.strCategory;
    //         templateRegularCards.querySelector('#alchoholicDrink').textContent = 
    //             c.strAlcoholic == 'Non alcoholic' ? 'No' : 'Yes' ;
    //         templateRegularCards.querySelector('#instructionsButton').onclick = function () {
    //             this.makeModalCocktail();
    //         }
    //         const clone = templateRegularCards.cloneNode(true);
    //         fragment.appendChild(clone);

    //     });
        
    //     const cardsContainer = getById('cardsContainer');

    //     cardsContainer.appendChild(fragment);
    //     return
    // }



















  // let elementsArr = [];

        // response.forEach(c => {
        //     const div1 = createElementHtml({
        //         element:'div', 
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'col-md-2 card-block'
        //              }
        //         ]
        //     });

        //     const img = createElementHtml({
        //         element: 'img',
        //         att: [
        //             {
        //                 att: 'src',
        //                 info: c.strDrinkThumb
        //             },
        //             {
        //                 att: 'id',
        //                 info: 'imgCardCocktail'
        //             },
        //         ]
        //     });

        //     const p = createElementHtml({
        //         element: 'p',
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'mb-0 text-center text-white drink-title'
        //             },
        //             {
        //                 att: 'id',
        //                 info: 'titleCardCocktail'
        //             },
        //         ]
        //     });
            
        //     const div2 = createElementHtml({
        //         element: 'div',
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'text-start mb-5'
        //             },
        //         ]
        //     });
            
        //     // drink category
        //     const p2 = createElementHtml({
        //         element: 'p',
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'mb-0  text-white drink-info'
        //             },
        //         ]
        //     });

        //     const span = createElementHtml({
        //         element: 'span',
        //         att: [
        //             {
        //                 att: 'id',
        //                 info: 'drinkCategory'
        //             },
        //         ]
        //     });
            
        //     // alcoholic drink
        //     const p3 = createElementHtml({
        //         element: 'p',
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'mb-0  text-white drink-info'
        //             },
        //         ]
        //     });
            
        //     const span2 = createElementHtml({
        //         element: 'span',
        //         att: [
        //             {
        //                 att: 'id',
        //                 info: 'drinkCategory'
        //             },
        //         ]
        //     });           

        //     const div3 = createElementHtml({
        //         element: 'div',
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'text-center mt-2 card-footer'
        //             },
        //         ]
        //     });

        //     const button = createElementHtml({
        //         element: 'button',
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'btn btn-warning'
        //             },
        //         ]
        //     });
            

        //     const i = createElementHtml({
        //         element: 'i',
        //         att: [
        //             {
        //                 att: 'class',
        //                 info: 'fas fa-eye text-dark mr-2'
        //             },
        //         ]
        //     });

        //     // asignación de valores
        //     p.textContent = c.strDrink;
        //     span.textContent = 'Drink Category: '+  c.strCategory;
        //     const isAlcoholic = c.strAlcoholic == 'Alcoholic' ? 'Yes' : 'No';
        //     span2.textContent = 'Alcoholic Drink: ' +  isAlcoholic;
        //     button.onclick = function() {
        //         const h = new HtmlClass();
        //         h.makeModalCocktail(c);
        //     }


        //     div1.appendChild(img);
        //     div1.appendChild(p);

        //     p2.appendChild(span);
        //     p3.appendChild(span2);
        //     div2.appendChild(p2);
        //     div2.appendChild(p3);

        //     button.appendChild(i);

        //     div3.appendChild(button);

        //     div1.appendChild(div2);
        //     div1.appendChild(div3);
            
        //     elementsArr.push(div1);
        // });

        // const cardsContainer = getById('cardsContainer');
        // cardsContainer.append(...elementsArr);
