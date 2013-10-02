"use strict";

var peryod = require( "../lib/peryod.js" );

module.exports = {
    setUp: function( done ) {
        done();
    },

    "0 - 59 seconds": function( test ) {
        var dDate = new Date();
        test.equal( dDate.peryod() , "a few seconds ago...", "should be \"a few seconds ago...\".");

        dDate.setTime( dDate.getTime() - 30000 );
        test.equal( dDate.peryod() , "a few seconds ago...", "should be \"a few seconds ago...\".");

        test.done();
    },

    "with given reference date": function( test ) {
        var dDate = new Date( 2012, 6, 7, 8, 9, 10 ),
            dNow = new Date( 2012, 6, 7, 8, 9, 31 );

        test.equal( dDate.peryod( dNow ) , "a few seconds ago...", "should be \"a few seconds ago...\".");

        test.done();
    },

    "1 minute": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 60000 );
        test.equal( dDate.peryod() , "1 minute ago...", "should be \"1 minute ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 110000 );
        test.equal( dDate.peryod() , "1 minute ago...", "should be \"1 minute ago...\".");

        test.done();
    },

    "2 - 59 minutes": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 120000 );
        test.equal( dDate.peryod() , "2 minutes ago...", "should be \"2 minutes ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 1800000 );
        test.equal( dDate.peryod() , "30 minutes ago...", "should be \"30 minutes ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 3300000 );
        test.equal( dDate.peryod() , "55 minutes ago...", "should be \"55 minutes ago...\".");

        test.done();
    },

    "1 hour": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 3600000 );
        test.equal( dDate.peryod() , "1 hour ago...", "should be \"1 hour ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 7198000 );
        test.equal( dDate.peryod() , "1 hour ago...", "should be \"1 hour ago...\".");

        test.done();
    },

    "2 - 6 hours": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 7200000 );
        test.equal( dDate.peryod() , "2 hours ago...", "should be \"2 hours ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 21600000 );
        test.equal( dDate.peryod() , "6 hours ago...", "should be \"6 hours ago...\".");

        test.done();
    },

    "7 - 23 hours in the same day": function( test ) {
        var dDate = new Date( 2012, 6, 7, 8, 9, 10 ),
            dNow = new Date( 2012, 6, 7, 16, 18, 18 );

        test.equal( dDate.peryod( dNow ) , "8 hours ago...", "should be \"8 hours ago...\".");

        dDate = new Date( 2012, 6, 7, 0, 9, 10 );
        dNow = new Date( 2012, 6, 7, 23, 55, 18 );

        test.equal( dDate.peryod( dNow ) , "23 hours ago...", "should be \"23 hours ago...\".");

        test.done();
    },

    "7+ hours, yesterday": function( test ) {
        var dDate = new Date( 2012, 6, 6, 23, 9, 10 ),
            dNow = new Date( 2012, 6, 7, 2, 18, 18 );

        test.notEqual( dDate.peryod( dNow ), "yesterday, 09:10", "should not be \"yesterday, 09:10\"." );

        dDate = new Date( 2012, 6, 6, 23, 9, 10 );
        dNow = new Date( 2012, 6, 7, 12, 18, 18 );

        test.equal( dDate.peryod( dNow ), "yesterday, 09:10", "should be \"yesterday, 09:10\"." );

        test.done();
    },

    "far from yesterday": function( test ) {
        var dDate = new Date( 2012, 6, 3, 23, 9, 10 );

        test.equal( dDate.peryod(), "03 july 2012, 09:10", "should be \"03 july 2012, 09:10\"." );

        test.done();
    }

    // TODO: language object
};
