<!--

@license Apache-2.0

Copyright (c) 2022 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# accessorSetter

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Return an accessor function for setting an element in an array-like object supporting the get/set protocol.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="installation">

## Installation

```bash
npm install @stdlib/array-base-accessor-setter
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm` branch][esm-url].
-   If you are using Deno, visit the [`deno` branch][deno-url].
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd` branch][umd-url].

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

</section>

<section class="usage">

## Usage

```javascript
var accessorSetter = require( '@stdlib/array-base-accessor-setter' );
```

#### accessorSetter( dtype )

Returns an accessor function for setting an element in an array-like object supporting the get/set protocol.

```javascript
var Complex64Array = require( '@stdlib/array-complex64' );
var Complex64 = require( '@stdlib/complex-float32' );
var realf = require( '@stdlib/complex-realf' );
var imagf = require( '@stdlib/complex-imagf' );

var arr = new Complex64Array( [ 1, 2, 3, 4 ] );

var set = accessorSetter( 'complex64' );
set( arr, 1, new Complex64( 10.0, 11.0 ) );

var v = arr.get( 1 );
// returns <Complex64>

var re = realf( v );
// returns 10.0

var im = imagf( v );
// returns 11.0
```

The returned accessor function accepts the following arguments:

-   **arr**: input array.
-   **idx**: element index.
-   **value**: value to set.

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   If provided an unsupported [`dtype`][@stdlib/array/dtypes], the function returns a default accessor function for accessing elements from any indexed array-like object supporting the get/set protocol; otherwise, the function returns an accessor function which should **only** be provided an array instance corresponding to `dtype` (e.g., if `dtype` is `'complex64'`, the returned accessor function should only be provided instances of `Complex64Array`).
-   Accessor functions do **not** verify that provided input arrays are array instances corresponding to `dtype`, as doing so would introduce performance overhead. If array instances corresponding to other data types are provided to an accessor function, JavaScript runtimes will consider the function polymorphic, potentially triggering de-optimization. In order to ensure maximum performance, **always** ensure that an accessor function is monomorphic.
-   Accessor functions do **not** perform bounds checking.
-   Accessor functions do **not** validate input values.
-   Accessor functions do **not** verify that provided input arrays actually implement the get/set protocol.
-   An array-like object supporting the get/set protocol is a data structure in which one accesses elements using explicit `get` and `set` methods (e.g., `Complex64Array` and `Complex128Array`).

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var Complex128Array = require( '@stdlib/array-complex128' );
var Complex64Array = require( '@stdlib/array-complex64' );
var Complex128 = require( '@stdlib/complex-float64' );
var Complex64 = require( '@stdlib/complex-float32' );
var zeroTo = require( '@stdlib/array-base-zero-to' );
var dtype = require( '@stdlib/array-dtype' );
var accessorSetter = require( '@stdlib/array-base-accessor-setter' );

var arr = new Complex128Array( zeroTo( 10 ) );
accessorSetter( dtype( arr ) )( arr, 2, new Complex128( 100.0, 101.0 ) );

var v = arr.get( 2 );
// returns <Complex128>

console.log( '%s', v.toString() );
// => '100 + 101i'

arr = new Complex64Array( zeroTo( 10 ) );
accessorSetter( dtype( arr ) )( arr, 4, new Complex64( 102.0, 103.0 ) );

v = arr.get( 4 );
// returns <Complex64>

console.log( '%s', v.toString() );
// => '102 + 103i'
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2022. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/array-base-accessor-setter.svg
[npm-url]: https://npmjs.org/package/@stdlib/array-base-accessor-setter

[test-image]: https://github.com/stdlib-js/array-base-accessor-setter/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/array-base-accessor-setter/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/array-base-accessor-setter/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/array-base-accessor-setter?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/array-base-accessor-setter.svg
[dependencies-url]: https://david-dm.org/stdlib-js/array-base-accessor-setter/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/array-base-accessor-setter/tree/deno
[umd-url]: https://github.com/stdlib-js/array-base-accessor-setter/tree/umd
[esm-url]: https://github.com/stdlib-js/array-base-accessor-setter/tree/esm
[branches-url]: https://github.com/stdlib-js/array-base-accessor-setter/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/array-base-accessor-setter/main/LICENSE

[@stdlib/array/dtypes]: https://github.com/stdlib-js/stdlib

</section>

<!-- /.links -->
