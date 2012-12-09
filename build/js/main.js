(function($){

  var ROOT = '/SassReference/',
      nav = null,
      navCoordinates = 0;
  
  window.addEvents({
    'load':function() {
      
    },
    'domready':function () {
      prettyPrint();
      new mooNav('global-nav');
    }
  });
  
}(document.id));

(function($) {
  
  window.mooNav = new Class({
    Implements: [Options, Events],
    
    enabled:false,
    
    fixed:false,
    
    step:1,
    
    diff:0,
    
    initialize: function(element, options){
      this.setOptions(options);
      
      this.element = $(element);
      
      if(!this.element && typeOf(element) === 'string') {
        this.element = element;
      }
      
      if (!this.element) {
        throw new Error('[mooNav] Element is not found.');

      }
      
      
      window.addEvent('scroll', this.watch.bind(this));
    },
    
    set:function() {
      this.coordinates = this.element.getCoordinates();
      this.parent = this.element.getParent();
      this.totalStep = Math.floor(this.parent.getSize().y/this.coordinates.height);
      if (document.body.scrollTop > this.coordinates.height) {
        this.step = Math.round(document.body.scrollTop / this.coordinates.height);
      }
      console.log(this.step, this.coordinates)
    },
    
    
    watch: function(e) {
      var scrollTop = document.body.scrollTop;
      
      if (typeOf(this.element) === 'string') {
        this.element = $(this.element);
      }
      
      if (!this.enabled) {
        this.set();
        this.enabled = true;
      }
      
      this.diff = scrollTop;
      console.log(this.step, this.coordinates.height * this.step, (this.coordinates.height * (this.step - 1)))
      console.log(document.body.scrollTop, this.coordinates);
      
      
      if (scrollTop >= (this.coordinates.height * this.step) && (this.step < this.totalStep)) {
        console.log('set+')
        this.element.setStyles({
          '-webkit-transform':'translateY(' + (this.coordinates.height * this.step) + 'px)'
        });
        this.step++;
      }
      
      if (scrollTop <= (this.coordinates.height * (this.step - 1))) {
        console.log('set-')
        this.element.setStyles({
          '-webkit-transform':'translateY(' + (this.coordinates.height * (this.step - 1)) + 'px)'
        });
        this.step--;
      }

      //if (scrollTop <= (this.coordinates.height * this.step - 1) && this.step > 0) {
      //this.step--;
      //  console.log('set-')
     // }
      /*
      if (scrollTop >= this.coordinates.height && !this.fixed) {
        this.element.setStyles({
          '-webkit-transform':'translateY(' + (document.body.scrollTop - this.coordinates.top) + 'px)'
        });
        
        this.coordinates = this.element.getCoordinates();
        this.fixed = true;
      }
      
      
      if (scrollTop < this.coordinates.top/2 && this.fixed) {
        this.element.setStyles({
          '-webkit-transform':'translateY(0px)'
        });
        this.fixed = false;
      }*/
      
    },
    
    moveEnd: function(){
        this.fireEvent('moveEnd');
    }
  });
  
}(document.id));
