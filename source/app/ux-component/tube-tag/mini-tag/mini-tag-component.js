(function() {
  'use strict';

  angular
    .module('tubeTagGenerator')
    .component('miniTag', {
      transclude: true,
      templateUrl: 'app/ux-component/tube-tag/mini-tag/mini-tag-template.html',
      controller: Controller,
      bindings: {
        base: '=',
        tagType: '='
      },
      require: {
        tubeTag: '^tubeTag'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile'
  ];

  function Controller($scope, $element, $compile) {
    var self = this;

    var BARCODE_SETTINGS = {
      format: 'CODE39',
      width: 1.1,
      height: 15,
      displayValue: true,
      textmargin: 0,
      font: "monospace",
      textAlign: "center",
      fontSize: 10
    }

    self.renderBarcode = renderBarcode;
    self.generator = generator;
    self.$onInit = onInit;

    function onInit() {
      self.BaseInfo = angular.copy(self.base);
      self.tubeTag.customTag = self;
      self.type = self.tagType || 'simple';
      self.generator();
    };

    function renderBarcode() {
      var barcodeContainer = $element.find('svg')[0];
      JsBarcode(barcodeContainer, self.base.number, BARCODE_SETTINGS);

    }

    function generator() {
      $compile($element.contents())($scope);
      renderBarcode();
    }
  }
}());
