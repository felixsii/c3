import { initChart } from './c3-helper'

describe('c3 api zoom', function() {
  'use strict'

  let chart, args

  beforeEach(function(done) {
    chart = initChart(chart, args, done)
  })

  describe('zoom', function() {
    beforeAll(function() {
      args = {
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25],
            ['data3', 150, 120, 110, 140, 115, 125]
          ]
        },
        zoom: {
          enabled: true
        }
      }
    })

    it('should return the correct extent', function() {
      const zoomDomain = chart.zoom(),
        expectedDomain = chart.internal.x.domain()

      expect(+zoomDomain[0]).toBe(+expectedDomain[0])
      expect(+zoomDomain[1]).toBe(+expectedDomain[1])
    })

    it('should be zoomed properly', function() {
      let target = [3, 5],
        domain
      chart.zoom(target)
      domain = chart.internal.x.domain()
      expect(domain[0]).toBe(target[0])
      expect(domain[1]).toBe(target[1])
    })

    it('should be zoomed properly again', function() {
      let target = [1, 4],
        domain
      chart.zoom(target)
      domain = chart.internal.x.domain()
      expect(domain[0]).toBe(target[0])
      expect(domain[1]).toBe(target[1])
    })

    it('should set the max zoom properly', function() {
      chart.zoom.max(100)
      expect(chart.zoom.max()).toBe(100)
    })

    it('should set the min zoom properly', function() {
      chart.zoom.min(-1)
      expect(chart.zoom.min()).toBe(-1)
    })

    describe('with timeseries data', function() {
      beforeAll(function() {
        args = {
          data: {
            x: 'date',
            columns: [
              ['date', '2014-01-01', '2014-01-02', '2014-08-01', '2014-10-19'],
              ['data1', 30, 200, 100, 400]
            ]
          },
          axis: {
            x: {
              type: 'timeseries'
            }
          },
          zoom: {
            enabled: true
          }
        }
      })

      it('should be zoomed properly', function() {
        let target = [new Date(2014, 7, 1), new Date(2014, 8, 1)],
          domain
        chart.zoom(target)
        domain = chart.internal.x.domain()
        expect(+domain[0]).toBe(+target[0])
        expect(+domain[1]).toBe(+target[1])
      })

      it('should be zoomed properly', function() {
        let target = ['2014-08-01', '2014-09-01'],
          domain
        chart.zoom(target)
        domain = chart.internal.x.domain()
        expect(+domain[0]).toBe(+chart.internal.parseDate(target[0]))
        expect(+domain[1]).toBe(+chart.internal.parseDate(target[1]))
      })
    })
  })

  describe('unzoom', function() {
    beforeAll(function() {
      args = {
        data: {
          columns: [['data1', 30, 200, 100, 400, 150, 250]]
        },
        zoom: {
          enabled: true
        }
      }
    })

    it('should be unzoomed properly', function() {
      let target = [1, 4],
        orginal = chart.internal.x.domain(),
        domain

      chart.zoom(target)
      domain = chart.internal.x.domain()
      expect(domain[0]).toBe(target[0])
      expect(domain[1]).toBe(target[1])

      chart.unzoom()
      domain = chart.internal.x.domain()
      expect(domain[0]).toBe(orginal[0])
      expect(domain[1]).toBe(orginal[1])
    })
  })
})
