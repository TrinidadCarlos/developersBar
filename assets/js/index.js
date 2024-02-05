import { AlertsClass } from "./AlertsClass.js";
import { FuncsClass } from "./FuncsClass.js";
import { ApiClass } from "./ApiClass.js";
import { HtmlClass } from "./HtmlClass.js";
import { statusPage, navOptions } from "./vars.js";

const ac = new AlertsClass();
const fc = new FuncsClass();
const mhc = new HtmlClass();
// const apiC = new ApiClass();

const { isNil, getById, getFavorites } = fc;
const { simpleAlert } = ac;
const {
  showHideLoaderLogin,
  showHideLoader,
  showHideMainLogin,
  showHideLoaderMain,
  makeCocktailsCardsHtml,
  makeIngredientsCardsHtml,
  changePageTitle,
  showHideAlphabet,
  clearCardsContainer
} = mhc;

// const {getCocktailByName} = apiC;

class InitApp {
  searchButton = null;
  buttonCocktail = null;
  buttonIngredient = null;
  buttonsSelect = null;
  inputSearchContainer = null;
  optionSelectedP = null;
  fullLoader = null;
  loginElement = null;
  mainContent = null;
  optionSelectedValue = "";
  searchLoginReturn = null;

  // mainElements
  navSelected = "";
  alphabetLetterSelected = "A";
  pageWasOpened = false; // es false en la primera carga... true al hacer un reload (simepre y cuando se haya entrado a la página principal con el mnú)

  // api class

  constructor() {}
  startPage () {
     // se ejecuta para que se cree el elemento div con el canvas... por defecto tiene un zindex de 100
    // esto para que cuando se de click en gurdar, se le agregue una clase con z-index mas alto... ver
    // la funcion makeConfetti
    confetti({
      particleCount:0,
      spread:0,
      originY: 0,
      startVelocity:0,
  });

    this.getLoginElements();
    const reloadPage = this.checkStatusPage();
    
    
    if (reloadPage === false) {
      // no ha cargado la página antes... primer inicio
      this.assignEvents();
    } else {
      // recargó la página por ejemplo
      this.initMainPage();
    }
  }

  checkStatusPage() {
    const status = localStorage.getItem("statusPage");
    let stat = false;
    if (isNil(status) === false) {
      stat = true;
      this.pageWasOpened = true;
    } else {
      stat = false;
      this.pageWasOpened = false;
    }

       // revisamos si existen favoritos... para mostrar la opción del menú..
       let myF = getFavorites();
       if(isNil(myF) === false){
         const linkF = getById('favoritesLink');
         if (isNil(linkF) === false) {
           linkF.classList.remove('d-none');
         }
       }


    return stat;
  }

  getLoginElements() {
    const searchLogin = getById("searchLogin");
    const buttonCocktail = getById("buttonCocktail");
    const buttonIngredient = getById("buttonIngredient");
    const buttonsSelect = getById("buttonsSelect");
    const inputSearchContainer = getById("inputSearchContainer");
    const optionSelectedP = getById("optionSelectedP");
    const fakeLogin = getById("fakeLogin");
    const fullLoader = getById("fullLoader");
    const mainContent = getById("mainContent");
    const searchLoginReturn = getById('searchLoginReturn');

    if (isNil(fakeLogin) === false) {
      this.loginElement = fakeLogin;
    }
    if (isNil(fullLoader) === false) {
      this.fullLoader = fullLoader;
    }
    if (isNil(mainContent) === false) {
      this.mainContent = mainContent;
    }

    if (isNil(searchLogin) === false) {
      this.searchButton = searchLogin;
    }
    if (isNil(buttonCocktail) === false) {
      this.buttonCocktail = buttonCocktail;
    }
    if (isNil(buttonIngredient) === false) {
      this.buttonIngredient = buttonIngredient;
    }
    if (isNil(buttonsSelect) === false) {
      this.buttonsSelect = buttonsSelect;
    }
    if (isNil(inputSearchContainer) === false) {
      this.inputSearchContainer = inputSearchContainer;
    }
    if (isNil(optionSelectedP) === false) {
      this.optionSelectedP = optionSelectedP;
    }
    if (isNil(searchLoginReturn) === false) {
        this.searchLoginReturn = searchLoginReturn;
    }

    showHideLoader({
      fullLoader,
      show: true,
    });

    return;
  }


  getMainElements() {
    this.navEvents();
  }

  showHideInputLogin(show = false) {
    if (
      isNil(show) === true ||
      isNil(this.buttonsSelect) === true ||
      isNil(this.inputSearchContainer) === true
    ) {
      return;
    }

    if (show === true) {
      this.buttonsSelect.classList.add("d-none");
    } else {
      this.buttonsSelect.classList.remove("d-none");
    }

    if (show === true) {
      this.inputSearchContainer.classList.remove("d-none");
      this.optionSelectedP.textContent = `${this.optionSelectedValue} name :`;
    } else {
      // this.optionSelectedP.textContent = "";
      // this.optionSelectedValue = '';
      getById('inputLogin').value = '';
      this.inputSearchContainer.classList.add("d-none");
    }
  }

  async searchCocktails() {
    const inputLogin = getById("inputLogin");

    if (isNil(inputLogin) === true) {
      return;
    }

    const value = inputLogin.value;

    if (isNil(value) === true) {
      simpleAlert({
        title: "Opps!",
        text: "Empty field",
        icon: "info",
        confirmButtonText: "Ok",
      });

      return;
    }

    const apiC = new ApiClass();
    let response = null;

    try {
      showHideLoaderLogin({
        show: true,
        loginElement: this.loginElement,
        fullLoader: this.fullLoader,
      });

      if (this.optionSelectedValue === "Cocktail") {
        response = await apiC.getCocktailByName({ name: value });
        response = response?.drinks;
      } else if (this.optionSelectedValue === "Ingredient") {
        response = await apiC.getCocktailByIngredient({ ingredient: value });
        response = response?.drinks;
      }

      if (isNil(response) === true) {
        showHideLoaderLogin({
          show: false,
          loginElement: this.loginElement,
          fullLoader: this.fullLoader,
        });
        simpleAlert({
          title: "",
          text: "There is no result. Try another name, please...",
          icon: "info",
          confirmButtonText: "Ok",
        });
      } else {
        return response;
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
    }
  }

  assignEvents() {
    this.buttonCocktail.addEventListener("click", (e) => {
      this.optionSelectedValue = "Cocktail";
      this.showHideInputLogin(true);
    });
    this.buttonIngredient.addEventListener("click", (e) => {
      this.optionSelectedValue = "Ingredient";
      this.showHideInputLogin(true);
    });

    // aqui inicia gran parte del funcionamiento
    this.searchButton.addEventListener("click", async () => {
      const response = await this.searchCocktails();

      if (isNil(response) === false) {
        if (this.optionSelectedValue === "Cocktail") {
          makeCocktailsCardsHtml(response);
          showHideLoaderMain({
            show: true,
            mainContent: this.mainContent,
            fullLoader: this.fullLoader,
          });
          this.getMainElements(); // se oculta el login fake y se muestra el main... por eso se llama aqui
          this.showHideInputLogin(false); // resetea el login--- si entra y sale al instante, el input se muestra y la opcion con la que entró
        } else if (this.optionSelectedValue === "Ingredient") {
          const valuesSize =
            response?.length > 15 ? response.slice(0, 15) : response;
          const res = await makeIngredientsCardsHtml(valuesSize);
          showHideLoaderMain({
            show: true,
            mainContent: this.mainContent,
            fullLoader: this.fullLoader,
          });
          this.getMainElements(); // se oculta el login fake y se muestra el main... por eso se llama aqui
          this.showHideInputLogin(false); // resetea el login--- si entra y sale al instante, el input se muestra y la opcion con la que entró
        }

          /* 
            quiere decir que viene del "login" hay que ver si entró con cocktail o ingredient
            para colocar el titulo de la página
            */
          const sM = getById('searchMain');
          sM.classList.remove('d-none');
          
          if (this.optionSelectedValue == 'Cocktail') {
              this.navSelected = navOptions.cocktailByName.id;
              changePageTitle({
                title: navOptions.cocktailByName.title,
                icon: navOptions.cocktailByName.icon
              });
            } else if (this.optionSelectedValue == 'Ingredient') {
              this.navSelected = navOptions.cocktailByIngredient.id;
              changePageTitle({
                title: navOptions.cocktailByIngredient.title,
                icon: navOptions.cocktailByIngredient.icon
              });
            }


          
      }
    });

    this.searchLoginReturn.addEventListener('click', () => {
        this.showHideInputLogin(false);
    });

    return;
  }

  initMainPage() {
    this.getMainElements();

    setTimeout(() => {
        showHideMainLogin({
          show: true,
          loginElement: this.loginElement,
          mainContent: this.mainContent,
        });
    
        showHideLoader({
          fullLoader,
          show: false,
        });    
    
        // POR DEFECTO VA A SER LA OPCIÓN DE "COCKTAILS" DEL MENÚ...
        if (this.pageWasOpened === true) {
          // LA OPCION DE COCKTAILS ES UN MENU DE LA  A HASTA LA Z
          this.navSelected = "cocktails";
          const titleData = navOptions.cocktails;
          changePageTitle(titleData);
          showHideAlphabet(true);
          this.alphabetEvents();
          this.initialDataReload('A');
        }

    },1000);

  }

     navEvents () {
        const navLinks = document.querySelectorAll(".link-text");

        if (isNil(navLinks) === false) {
        navLinks.forEach((l) => {
            l.addEventListener("click", async (e) => {
            const op = e.target.dataset.menu;
            this.navSelected = op;
            const titleData = navOptions[e.target.dataset.menu];
            changePageTitle(titleData);


            // para ocultar o mostra el alfabeto 
            const aC = getById('alphabetContainer');
            if (isNil(aC) === false) {
                if (op !== navOptions.cocktails.id) {
                    aC.classList.add('d-none');
                } else {
                    aC.classList.remove('d-none');
                }
            }

            // para ocultar o mostrar el input de busqueda de la página main
            const sM = getById('searchMain');
            if (isNil(sM) === false) {
                if (op !== navOptions.cocktailByName.id && op !== navOptions.cocktailByIngredient.id) {
                    sM.classList.add('d-none');
                } else {
                  sM.classList.remove('d-none');
                }
              }
              const cardsContainer = getById('cardsContainer');
              clearCardsContainer({cardsContainer});

            // para cualquier opción que no sea cocktails, by name o by id se crea instancia de api...
            let apiC = null;
            if (
                op !== navOptions.cocktailByName.id &&
                op !== navOptions.cocktailByIngredient.id
            ) {
                apiC = new ApiClass();
            }

            switch (op) {
                case navOptions.cocktails.id:
                  const letters = document.querySelectorAll(".alphabet-letter");
                  this.resetAlphabet(letters);
                  this.alphabetEvents();
                  this.alphabetLetterSelected = 'A';
                    this.initialDataReload('A');
                    try {
                        showHideLoader({
                            fullLoader,
                            show: true,
                          });
                        const response = await apiC.getCocktailByLetter({letter: 'A'});
                        if (isNil(response?.drinks) === false) {
                          makeCocktailsCardsHtml(response.drinks);
                        } else{
                           simpleAlert({
                              title: 'Ouh!',
                              text: "There is no result. Try another name, please...",
                              icon: 'info'      
                          });
                        }
                      
                    } catch (error) {
                      console.log(error)
                    }finally{
                      showHideLoader({
                          fullLoader,
                          show: false,
                        });
                    }
                    break;
                case navOptions.randoms.id:
                    try {
                        showHideLoader({
                          fullLoader,
                          show: true,
                        });
                        const response = await apiC.getRandomDrinks({qty: 15});
                        if (isNil(response) === false) {
                          makeCocktailsCardsHtml(response);
                        } else{
                           simpleAlert({
                              title: 'Ouh!',
                              text: "There is no result. Try another name, please...",
                              icon: 'info'      
                          });
                        }
                      
                    } catch (error) {
                      console.log(error)
                    }finally{
                      showHideLoader({
                          fullLoader,
                          show: false,
                        });
                    }  
                
                    break;
                case navOptions.drinksWhitAlcohol.id:
                    try {
                        showHideLoader({
                          fullLoader,
                          show: true,
                        });
                        const response = await apiC.getCocktailsWithAlcohol ();
                        if (isNil(response) === false) {
                          makeCocktailsCardsHtml(response);
                        } else{
                           simpleAlert({
                              title: 'Ouh!',
                              text: "There is no result. Try another name, please...",
                              icon: 'info'      
                          });
                        }
                      
                    } catch (error) {
                      console.log(error)
                    }finally{
                      showHideLoader({
                          fullLoader,
                          show: false,
                        });
                    }  
                    
                    break;
                case navOptions.drinksWhithountAlcohol.id:
                    try {
                        showHideLoader({
                          fullLoader,
                          show: true,
                        });
                        const response = await apiC.getCocktailsWithouthAlcohol();
                        if (isNil(response) === false) {
                            makeCocktailsCardsHtml(response);
                        } else{
                           simpleAlert({
                              title: 'Ouh!',
                              text: "There is no result. Try another name, please...",
                              icon: 'info'      
                          });
                        }
                      
                    } catch (error) {
                      console.log(error)
                    }finally{
                      showHideLoader({
                          fullLoader,
                          show: false,
                        });
                    }  
                    break;
                case navOptions.cocktailByName.id:
                    showHideLoader({
                        fullLoader,
                        show: true,
                      });

                    setTimeout(() => { // realmente solo es para darle el efecto del loader... no es indispensable este timeout

                  
                      
                      const searchMainBtn = getById('searchMainBtn');

                      if(isNil(searchMainBtn) === false ) {
                        const apiC = new ApiClass();
                        searchMainBtn.addEventListener('click', async() => {
                            const inputSearchMain = getById('inputSearchMain').value;

                            if (isNil(inputSearchMain) === false) {
                                const response = await apiC.getCocktailByName({ name: inputSearchMain });
                                if (isNil(response?.drinks) === false) {
                                    makeCocktailsCardsHtml(response.drinks);
                                }else{
                                    simpleAlert({
                                        title: 'Ouh!',
                                        text: "There is no result. Try another name, please...",
                                        icon: 'info'      
                                    });
                                }
                            }
                        });
                      }

                    
                      // clearCardsContainer({cardsContainer});

                      showHideLoader({
                        fullLoader,
                        show: false,
                      });

                    },1500);

                    break;
                case navOptions.cocktailByIngredient.id: 
                    showHideLoader({
                        fullLoader,
                        show: true,
                      });
                      
                    setTimeout(() => { // realmente solo es para darle el efecto del loader... no es indispensable este timeout

                  
                      
                      const searchMainBtn = getById('searchMainBtn');
                      if(isNil(searchMainBtn) === false ) {
                        const apiC = new ApiClass();
                        searchMainBtn.addEventListener('click', async() => {
                            const inputSearchMain = getById('inputSearchMain').value;

                            if (isNil(inputSearchMain) === false) {
                                const response = await apiC.getCocktailByIngredient({ ingredient: inputSearchMain });
                                if (isNil(response?.drinks) === false) {
                                    let drinks = response.drinks;
                                    if (drinks?.length > 15) {
                                        drinks = drinks.slice(0, 15);
                                    }

                                    try{
                                        showHideLoader({
                                            fullLoader,
                                            show: true,
                                          });
                                          const drinksInfo = await apiC.getCocktailByID(drinks);
                                          makeCocktailsCardsHtml(drinksInfo);
                                    } catch(error) {
                                        console.log(error);
                                    }finally{
                                        showHideLoader({
                                            fullLoader,
                                            show: false,
                                          });
                                    }

                                }else{
                                    simpleAlert({
                                        title: 'Ouh!',
                                        text: "There is no result. Try another name, please...",
                                        icon: 'info'      
                                    });
                                }
                            }
                        });
                      }

                    
                      // clearCardsContainer({cardsContainer});

                      showHideLoader({
                        fullLoader,
                        show: false,
                      });

                    },1000);
                    break;
                case navOptions.logout.id:
                    showHideLoader({
                        fullLoader: this.fullLoader,
                        show: true
                    });
                    
                    setTimeout(() => { // EL TIMER PURO ADORNO PARA QUE SE VEA AL LOADER...
                        localStorage.removeItem('statusPage');
                        this.assignEvents();
                         this.mainContent.classList.add('d-none');
                         this.loginElement.classList.remove('d-none');
                         const letters = document.querySelectorAll(".alphabet-letter");
                         this.resetAlphabet(letters);
    
                         showHideLoader({
                            fullLoader: this.fullLoader,
                            show: false
                         });
                     },1500);


                    break;
                 case navOptions.favorites.id:
                      showHideLoader({
                          fullLoader: this.fullLoader,
                          show: true
                      });
                      
                      setTimeout(() => { // EL TIMER PURO ADORNO PARA QUE SE VEA AL LOADER...

                          const favs = getFavorites();

                          makeCocktailsCardsHtml(JSON.parse(favs), true);
                        
                           showHideLoader({
                              fullLoader: this.fullLoader,
                              show: false
                           });
                       },1500);
  
  
                      break;
                default:
                    break;
            }



            });
        });
        }
    }


   alphabetEvents() {
    // asignar eventos al alfabeto
    const letters = document.querySelectorAll(".alphabet-letter");
    if (isNil(letters) === false) {
        letters.forEach((l) => {
            l.addEventListener("click", async (e) => {
          
              const cardsContainer = getById('cardsContainer');
              clearCardsContainer({cardsContainer});
          
       this.resetAlphabet(letters);
        
        this.alphabetLetterSelected = e.target.dataset.letter;
        e.target.classList.add("alphabet-selected"); // indica la letra que tenemos seleccionada...
        
        this.initialDataReload(e.target.dataset.letter);
        
    });
      });
    }
   }

   resetAlphabet (letters = []) {
    letters.forEach((ls) => {
      if (ls.classList.contains("alphabet-selected")) {
          ls.classList.remove("alphabet-selected");
      }
    });
   }

   async initialDataReload (letter = 'A') {
    
          // remover la clase de "alphabet-selected" antes de colocarla al nuevo click
          const apiC = new ApiClass();

          // si la pagina fue recargada, se pone en automatico la letra A en la opción de cocktails
          // if (this.pageWasOpened === true) {
            const alphabetLetter = getById(this.alphabetLetterSelected);
            if (isNil(alphabetLetter) === false) {
                alphabetLetter.classList.add("alphabet-selected");
            }
          // }


    try {
        showHideLoader({
          fullLoader,
          show: true,
        });
        const response = await apiC.getCocktailByLetter({letter});
        if (isNil(response?.drinks) === false) {
          makeCocktailsCardsHtml(response.drinks);
        } else{
           simpleAlert({
              title: 'Ouh!',
              text: "There is no result. Try another name, please...",
              icon: 'info'      
          });
        }
      
    } catch (error) {
      console.log(error)
    }finally{
      showHideLoader({
          fullLoader,
          show: false,
        });
    }
    return ;
   }

}

window.addEventListener("DOMContentLoaded", () => {
    const initApp = new InitApp();
    initApp.startPage();
});
