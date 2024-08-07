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

var tape = require( 'tape' );
var Complex128Array = require( '@stdlib/array-complex128' );
var Complex64Array = require( '@stdlib/array-complex64' );
var Complex128 = require( '@stdlib/complex-float64-ctor' );
var Complex64 = require( '@stdlib/complex-float32-ctor' );
var real = require( '@stdlib/complex-float64-real' );
var imag = require( '@stdlib/complex-float64-imag' );
var realf = require( '@stdlib/complex-float32-real' );
var imagf = require( '@stdlib/complex-float32-imag' );
var zeroTo = require( '@stdlib/array-base-zero-to' );
var setter = require( './../lib' );


// FUNCTIONS //

/**
* Returns an accessor array-like object.
*
* @private
* @returns {ArrayLikeObject} array-like object
*/
function accessorArray() {
	var arr = [ 1, 2, 3, 4 ];
	arr.set = set;
	arr.get = get;
	return arr;

	/**
	* Returns an array element.
	*
	* @private
	* @param {NonNegativeInteger} idx - index
	* @returns {number} element
	*/
	function get( idx ) {
		return arr[ idx ];
	}

	/**
	* Sets an array element.
	*
	* @private
	* @param {number} value - value to set
	* @param {NonNegativeInteger} idx - index
	*/
	function set( value, idx ) {
		arr[ idx ] = value;
	}
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof setter, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function for setting an array element', function test( t ) {
	var arr;
	var set;
	var v;

	set = setter( 'complex128' );
	arr = new Complex128Array( zeroTo( 10 ) );
	set( arr, 2, new Complex128( 100.0, 101.0 ) );
	v = arr.get( 2 );
	t.strictEqual( real( v ), 100.0, 'returns expected value' );
	t.strictEqual( imag( v ), 101.0, 'returns expected value' );

	set = setter( 'complex64' );
	arr = new Complex64Array( zeroTo( 10 ) );
	set( arr, 2, new Complex64( 102.0, 103.0 ) );
	v = arr.get( 2 );
	t.strictEqual( realf( v ), 102.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 103.0, 'returns expected value' );

	t.end();
});

tape( 'the function returns a function for setting an array element (unrecognized dtype)', function test( t ) {
	var arr;
	var set;
	var v;

	set = setter( 'foo' );
	arr = accessorArray();
	set( arr, 2, 105 );
	v = arr.get( 2 );
	t.strictEqual( v, 105, 'returns expected value' );

	t.end();
});

tape( 'the returned function does not perform bounds checks (unrecognized dtype)', function test( t ) {
	var arr;
	var set;
	var v;

	set = setter( 'foo' );
	arr = accessorArray();
	set( arr, 20, 10 );
	v = arr.get( 20 );
	t.strictEqual( v, 10, 'returns expected value' );

	t.end();
});
