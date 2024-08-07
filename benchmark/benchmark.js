/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var bench = require( '@stdlib/bench-harness' );
var discreteUniform = require( '@stdlib/random-base-discrete-uniform' ).factory;
var isFunction = require( '@stdlib/assert-is-function' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var isnanf = require( '@stdlib/math-base-assert-is-nanf' );
var filledBy = require( '@stdlib/array-filled-by' );
var Complex128Array = require( '@stdlib/array-complex128' );
var Complex64Array = require( '@stdlib/array-complex64' );
var Complex128 = require( '@stdlib/complex-float64-ctor' );
var Complex64 = require( '@stdlib/complex-float32-ctor' );
var real = require( '@stdlib/complex-float64-real' );
var imag = require( '@stdlib/complex-float64-imag' );
var realf = require( '@stdlib/complex-float32-real' );
var imagf = require( '@stdlib/complex-float32-imag' );
var dtype = require( '@stdlib/array-dtype' );
var pkg = require( './../package.json' ).name;
var setter = require( './../lib' );


// VARIABLES //

var rand = discreteUniform( 0, 127 );


// MAIN //

bench( pkg, function benchmark( b ) {
	var set;
	var dt;
	var i;

	dt = [
		'complex128',
		'complex64',
		'foo'
	];

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		set = setter( dt[ i%dt.length ] );
		if ( typeof set !== 'function' ) {
			b.fail( 'should return a function' );
		}
	}
	b.toc();
	if ( !isFunction( set ) ) {
		b.fail( 'should return a function' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':dtype=complex128', function benchmark( b ) {
	var values;
	var arr;
	var buf;
	var set;
	var i;
	var j;
	var v;

	values = [
		new Complex128( 1.0, 2.0 ),
		new Complex128( 3.0, 4.0 ),
		new Complex128( 5.0, 6.0 )
	];

	buf = filledBy( 100, 'float64', rand );
	arr = new Complex128Array( buf.buffer );
	set = setter( dtype( arr ) );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		j = i % arr.length;
		set( arr, j, values[ i%values.length ] );
		v = arr.get( j );
		if ( typeof v !== 'object' ) {
			b.fail( 'should return an object' );
		}
	}
	b.toc();
	if ( isnan( real( v ) ) || isnan( imag( v ) ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':dtype=complex64', function benchmark( b ) {
	var values;
	var arr;
	var buf;
	var set;
	var i;
	var j;
	var v;

	values = [
		new Complex64( 1.0, 2.0 ),
		new Complex64( 3.0, 4.0 ),
		new Complex64( 5.0, 6.0 )
	];

	buf = filledBy( 100, 'float32', rand );
	arr = new Complex64Array( buf.buffer );
	set = setter( dtype( arr ) );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		j = i % arr.length;
		set( arr, j, values[ i%values.length ] );
		v = arr.get( j );
		if ( typeof v !== 'object' ) {
			b.fail( 'should return an object' );
		}
	}
	b.toc();
	if ( isnanf( realf( v ) ) || isnanf( imagf( v ) ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});
