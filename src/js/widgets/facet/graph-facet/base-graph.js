define(['marionette', 'd3', 'jquery', 'jquery-ui',
  'js/widgets/base/item_view', 'hbs!./templates/graph'],
  function (Marionette, d3, $, $ui, BaseItemView, FacetGraphTemplate) {

  var ZoomableGraphView = BaseItemView.extend({

    className : "graph-facet",

    initialize   : function (options) {
      //setting some constants for the graph
      this.bins = 12; //will be around 12, depending on remainders
      this.margin = {
        top   : 10,
        right : 10,
        bottom: 5,
        left  : 50
      };
      this.fullWidth = 280;
      this.fullHeight = 200;

      this.width = this.fullWidth - this.margin.left - this.margin.right;
      this.height = this.fullHeight - this.margin.top - this.margin.bottom;

      try {
        this.graphData = this.model.toJSON().graphData;
      } catch (e) {
        throw new Error("Graph widget has no model or else an incorrect model")
      }

    },

    template: FacetGraphTemplate,

    insertLegend : function(){
      this.$(".graph-legend").html(this.legendTemplate());
    },

    events: {
      "click .apply"         : "submitFacet",
      "blur input[type=text]": "triggerGraphChange"
    },


    onRender: function () {

      if (this.model.get("graphData").length < 2){

        this.$el.html("Too little data to make a useful graph.")

      }
      else {
        this.buildGraph();
        this.insertLegend();
        this.addSliderWindows();
        this.buildSlider();
        if (this.addToOnRender){
          this.addToOnRender()
        }
        if (this.addChartEventListeners){
          this.addChartEventListeners();
        }
      }
    }

  });

  return ZoomableGraphView;

});