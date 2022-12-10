/**
 * @license
 * Copyright (c) 2021, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
'use strict';

const { AccUtilsStub, ArrayDataProviderStub } = require('./view-stubs');
const expect = require('chai').expect;
const { after, before, beforeEach, describe, it, xit } = require('mocha');
const requirejs = require('requirejs');
const testHelper = require('./test-helper');

describe('model-page', function () {
  const accUtilsStub = new AccUtilsStub();

  let ModelPageImpl;
  let ko;
  let i18next;
  let viewModel;

  before(function (done) {
    testHelper.install();
    requirejs(['viewModels/model-page-impl', 'knockout', 'utils/i18n'],
      function (viewModelConstructor, knockout, i18n) {
        ModelPageImpl = viewModelConstructor;
        ko = knockout;
        i18next = i18n;
        done();
      });
  });

  after(function() {
    testHelper.remove();
  });

  const args = {
    parentRouter: {
      createChildRouter: function() {
        return {
          sync: function() { /* This is intentionally empty */ },
          go: function() { /* This is intentionally empty */ }
        };
      }
    }
  };

  function ModuleRouterAdapterStub() { /* This is intentionally empty */ }

  beforeEach(function () {
    viewModel = new ModelPageImpl(args, accUtilsStub, ko, i18next, ModuleRouterAdapterStub, ArrayDataProviderStub);
  });

  function getEntry(array, key, value) {
    let result = undefined;
    for (const item of array) {
      if (item[key] === value) {
        result = item;
      }
    }
    return result;
  }

  function entry(array, key, value) {
    return getEntry(array, key, value);
  }

  it('the initial selection is the design view', function () {
    expect(viewModel.selectedItem()).to.equal('model-design-view');
  });

  xit('offers view choices choices', function () {
    const navData = viewModel.dataProvider.data;
    expect(entry(navData, 'path', 'model-design-view')).to.have.property('label', 'page-design-view');
    expect(entry(navData, 'path', 'model-code-view')).to.have.property('label', 'page-code-view');
  });
});
