# npm Life Cycle Scripts

## Why?

I felt that the npm docs on [Life Cycle Scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts) weren't very clear, especially for v8 which doesn't include the scripts that run for `npm install <package>`.

This repo documents the behavior exhausitvely by automatically running and detecting the scripts that run.


<!-- behavior:start -->
## npm 6 behavior

### `npm install`

1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish`
5. `prepare`

<details>
<summary>Output</summary><br>

```
> @ preinstall .
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> undefined install .
> echo '[TEST-LOG] install'

[TEST-LOG] install

> undefined postinstall .
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall
npm WARN prepublish-on-install As of npm@5, `prepublish` scripts are deprecated.
npm WARN prepublish-on-install Use `prepare` for build steps and `prepublishOnly` for upload-only.
npm WARN prepublish-on-install See the deprecation note in `npm help scripts` for more information.

> undefined prepublish .
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> undefined prepare .
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare
npm WARN a No description
npm WARN a No repository field.
npm WARN a No license field.

up to date in 0.169s
```
</details>

---

### `npm ci`

1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish`
5. `prepare`

<details>
<summary>Output</summary><br>

```
> @ preinstall .
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> @ install .
> echo '[TEST-LOG] install'

[TEST-LOG] install

> @ postinstall .
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall

> @ prepublish .
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> @ prepare .
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare
added 0 packages in 0.071s
```
</details>

---

### `npm pack`

1. `prepublish`
2. `prepare`
3. `prepack`
4. `postpack`

<details>
<summary>Output</summary><br>

```
npm WARN prepublish-on-install As of npm@5, `prepublish` scripts are deprecated.
npm WARN prepublish-on-install Use `prepare` for build steps and `prepublishOnly` for upload-only.
npm WARN prepublish-on-install See the deprecation note in `npm help scripts` for more information.

> package@0.0.0 prepublish .
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> package@0.0.0 prepare .
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare

> package@0.0.0 prepack .
> echo '[TEST-LOG] prepack'

[TEST-LOG] prepack

> package@0.0.0 postpack .
> echo '[TEST-LOG] postpack'

[TEST-LOG] postpack
npm notice 
npm notice 📦  package@0.0.0
npm notice === Tarball Contents === 
npm notice 738B package.json
npm notice === Tarball Details === 
npm notice name:          package                                 
npm notice version:       0.0.0                                   
npm notice filename:      package-0.0.0.tgz                       
npm notice package size:  301 B                                   
npm notice unpacked size: 738 B                                   
npm notice shasum:        2544a209ca24c029064851307f274e29eade4173
npm notice integrity:     sha512-hHEe9o8Cts1xx[...]SVCcKQD1/q/Pw==
npm notice total files:   1                                       
npm notice 
package-0.0.0.tgz
```
</details>

---

### `npm publish`

1. `prepublish`
2. `prepare`
3. `prepublishOnly`
4. `prepack`
5. `postpack`
6. `publish`
7. `postpublish`

<details>
<summary>Output</summary><br>

```
npm WARN prepublish-on-install As of npm@5, `prepublish` scripts are deprecated.
npm WARN prepublish-on-install Use `prepare` for build steps and `prepublishOnly` for upload-only.
npm WARN prepublish-on-install See the deprecation note in `npm help scripts` for more information.

> package@0.0.6 prepublish .
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> package@0.0.6 prepare .
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare

> package@0.0.6 prepublishOnly .
> echo '[TEST-LOG] prepublishOnly'

[TEST-LOG] prepublishOnly

> package@0.0.6 prepack .
> echo '[TEST-LOG] prepack'

[TEST-LOG] prepack

> package@0.0.6 postpack .
> echo '[TEST-LOG] postpack'

[TEST-LOG] postpack
npm notice 
npm notice 📦  package@0.0.6
npm notice === Tarball Contents === 
npm notice 738B package.json
npm notice === Tarball Details === 
npm notice name:          package                                 
npm notice version:       0.0.6                                   
npm notice package size:  302 B                                   
npm notice unpacked size: 738 B                                   
npm notice shasum:        1ae31c69c838602b8b53954e4ef18cdf65b53233
npm notice integrity:     sha512-/oiVDTiqD+BQp[...]r8iYHK+j919vw==
npm notice total files:   1                                       
npm notice 

> package@0.0.6 publish .
> echo '[TEST-LOG] publish'

[TEST-LOG] publish

> package@0.0.6 postpublish .
> echo '[TEST-LOG] postpublish'

[TEST-LOG] postpublish
+ package@0.0.6
```
</details>

---

### `npm install --foreground-scripts package@0.0.6`

1. `preinstall`
2. `install`
3. `postinstall`

<details>
<summary>Output</summary><br>

```
> package@0.0.6 preinstall ./node_modules/package
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> package@0.0.6 install ./node_modules/package
> echo '[TEST-LOG] install'

[TEST-LOG] install

> package@0.0.6 postinstall ./node_modules/package
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall
npm WARN a No description
npm WARN a No repository field.
npm WARN a No license field.

+ package@0.0.6
added 1 package in 0.225s
```
</details>


## npm 7 behavior

### `npm install`

1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish`
5. `preprepare`
6. `prepare`
7. `postprepare`

<details>
<summary>Output</summary><br>

```
npm WARN ancient lockfile 
npm WARN ancient lockfile The package-lock.json file was created with an old version of npm,
npm WARN ancient lockfile so supplemental metadata must be fetched from the registry.
npm WARN ancient lockfile 
npm WARN ancient lockfile This is a one-time fix-up, please be patient...
npm WARN ancient lockfile 

> preinstall
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> install
> echo '[TEST-LOG] install'

[TEST-LOG] install

> postinstall
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall

> prepublish
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> preprepare
> echo '[TEST-LOG] preprepare'

[TEST-LOG] preprepare

> prepare
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare

> postprepare
> echo '[TEST-LOG] postprepare'

[TEST-LOG] postprepare

up to date, audited 1 package in 299ms

found 0 vulnerabilities
```
</details>

---

### `npm ci`

1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish`
5. `preprepare`
6. `prepare`
7. `postprepare`

<details>
<summary>Output</summary><br>

```
npm WARN ancient lockfile 
npm WARN ancient lockfile The package-lock.json file was created with an old version of npm,
npm WARN ancient lockfile so supplemental metadata must be fetched from the registry.
npm WARN ancient lockfile 
npm WARN ancient lockfile This is a one-time fix-up, please be patient...
npm WARN ancient lockfile 

> preinstall
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> install
> echo '[TEST-LOG] install'

[TEST-LOG] install

> postinstall
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall

> prepublish
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> preprepare
> echo '[TEST-LOG] preprepare'

[TEST-LOG] preprepare

> prepare
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare

> postprepare
> echo '[TEST-LOG] postprepare'

[TEST-LOG] postprepare

up to date, audited 1 package in 299ms

found 0 vulnerabilities
```
</details>

---

### `npm pack`

1. `prepack`
2. `postpack`

<details>
<summary>Output</summary><br>

```
> package@0.0.0 prepack
> echo '[TEST-LOG] prepack'

[TEST-LOG] prepack

> package@0.0.0 postpack
> echo '[TEST-LOG] postpack'

[TEST-LOG] postpack
npm notice 
npm notice 📦  package@0.0.0
npm notice === Tarball Contents === 
npm notice 738B package.json
npm notice === Tarball Details === 
npm notice name:          package                                 
npm notice version:       0.0.0                                   
npm notice filename:      package-0.0.0.tgz                       
npm notice package size:  296 B                                   
npm notice unpacked size: 738 B                                   
npm notice shasum:        13b4a45fad1c359e3909135f41a290b250bfbda2
npm notice integrity:     sha512-w0O+CNEePTcxn[...]YANVfH1dOtvWg==
npm notice total files:   1                                       
npm notice 
package-0.0.0.tgz
```
</details>

---

### `npm publish`

1. `prepublishOnly`
2. `prepack`
3. `postpack`
4. `publish`
5. `postpublish`

<details>
<summary>Output</summary><br>

```
> package@0.0.7 prepublishOnly
> echo '[TEST-LOG] prepublishOnly'

[TEST-LOG] prepublishOnly

> package@0.0.7 prepack
> echo '[TEST-LOG] prepack'

[TEST-LOG] prepack

> package@0.0.7 postpack
> echo '[TEST-LOG] postpack'

[TEST-LOG] postpack
npm notice 
npm notice 📦  package@0.0.7
npm notice === Tarball Contents === 
npm notice 738B package.json
npm notice === Tarball Details === 
npm notice name:          package                                 
npm notice version:       0.0.7                                   
npm notice filename:      package-0.0.7.tgz                       
npm notice package size:  297 B                                   
npm notice unpacked size: 738 B                                   
npm notice shasum:        3a0a359eb7bee15ab53e8b3ada30c6307d479b04
npm notice integrity:     sha512-T6+14XElAdtFL[...]rRkPklNyWo5pw==
npm notice total files:   1                                       
npm notice 

> package@0.0.7 publish
> echo '[TEST-LOG] publish'

[TEST-LOG] publish

> package@0.0.7 postpublish
> echo '[TEST-LOG] postpublish'

[TEST-LOG] postpublish
+ package@0.0.7
```
</details>

---

### `npm install --foreground-scripts package@0.0.7`

1. `preinstall`
2. `install`
3. `postinstall`

<details>
<summary>Output</summary><br>

```
> package@0.0.7 preinstall
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> package@0.0.7 install
> echo '[TEST-LOG] install'

[TEST-LOG] install

> package@0.0.7 postinstall
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall

added 1 package in 299ms
```
</details>


## npm 8 behavior

### `npm install`

1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish`
5. `preprepare`
6. `prepare`
7. `postprepare`

<details>
<summary>Output</summary><br>

```
npm WARN ancient lockfile 
npm WARN ancient lockfile The package-lock.json file was created with an old version of npm,
npm WARN ancient lockfile so supplemental metadata must be fetched from the registry.
npm WARN ancient lockfile 
npm WARN ancient lockfile This is a one-time fix-up, please be patient...
npm WARN ancient lockfile 

> preinstall
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> install
> echo '[TEST-LOG] install'

[TEST-LOG] install

> postinstall
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall

> prepublish
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> preprepare
> echo '[TEST-LOG] preprepare'

[TEST-LOG] preprepare

> prepare
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare

> postprepare
> echo '[TEST-LOG] postprepare'

[TEST-LOG] postprepare

up to date, audited 1 package in 197ms

found 0 vulnerabilities
```
</details>

---

### `npm ci`

1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish`
5. `preprepare`
6. `prepare`
7. `postprepare`

<details>
<summary>Output</summary><br>

```
npm WARN ancient lockfile 
npm WARN ancient lockfile The package-lock.json file was created with an old version of npm,
npm WARN ancient lockfile so supplemental metadata must be fetched from the registry.
npm WARN ancient lockfile 
npm WARN ancient lockfile This is a one-time fix-up, please be patient...
npm WARN ancient lockfile 

> preinstall
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> install
> echo '[TEST-LOG] install'

[TEST-LOG] install

> postinstall
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall

> prepublish
> echo '[TEST-LOG] prepublish'

[TEST-LOG] prepublish

> preprepare
> echo '[TEST-LOG] preprepare'

[TEST-LOG] preprepare

> prepare
> echo '[TEST-LOG] prepare'

[TEST-LOG] prepare

> postprepare
> echo '[TEST-LOG] postprepare'

[TEST-LOG] postprepare

up to date, audited 1 package in 197ms

found 0 vulnerabilities
```
</details>

---

### `npm pack`

1. `prepack`
2. `postpack`

<details>
<summary>Output</summary><br>

```
> package@0.0.0 prepack
> echo '[TEST-LOG] prepack'

[TEST-LOG] prepack

> package@0.0.0 postpack
> echo '[TEST-LOG] postpack'

[TEST-LOG] postpack
npm notice 
npm notice 📦  package@0.0.0
npm notice === Tarball Contents === 
npm notice 738B package.json
npm notice === Tarball Details === 
npm notice name:          package                                 
npm notice version:       0.0.0                                   
npm notice filename:      package-0.0.0.tgz                       
npm notice package size:  296 B                                   
npm notice unpacked size: 738 B                                   
npm notice shasum:        13b4a45fad1c359e3909135f41a290b250bfbda2
npm notice integrity:     sha512-w0O+CNEePTcxn[...]YANVfH1dOtvWg==
npm notice total files:   1                                       
npm notice 
package-0.0.0.tgz
```
</details>

---

### `npm publish`

1. `prepublishOnly`
2. `prepack`
3. `postpack`
4. `publish`
5. `postpublish`

<details>
<summary>Output</summary><br>

```
> package@0.0.8 prepublishOnly
> echo '[TEST-LOG] prepublishOnly'

[TEST-LOG] prepublishOnly

> package@0.0.8 prepack
> echo '[TEST-LOG] prepack'

[TEST-LOG] prepack

> package@0.0.8 postpack
> echo '[TEST-LOG] postpack'

[TEST-LOG] postpack
npm notice 
npm notice 📦  package@0.0.8
npm notice === Tarball Contents === 
npm notice 738B package.json
npm notice === Tarball Details === 
npm notice name:          package                                 
npm notice version:       0.0.8                                   
npm notice filename:      package-0.0.8.tgz                       
npm notice package size:  297 B                                   
npm notice unpacked size: 738 B                                   
npm notice shasum:        07fce71eff96b48f873d8f65a60add6f29a8e032
npm notice integrity:     sha512-rav9gjaXIIXWo[...]Z9vAIISdZhzWA==
npm notice total files:   1                                       
npm notice 
npm notice Publishing to http://localhost:55188/

> package@0.0.8 publish
> echo '[TEST-LOG] publish'

[TEST-LOG] publish

> package@0.0.8 postpublish
> echo '[TEST-LOG] postpublish'

[TEST-LOG] postpublish
+ package@0.0.8
```
</details>

---

### `npm install --foreground-scripts package@0.0.8`

1. `preinstall`
2. `install`
3. `postinstall`
4. `dependencies`

<details>
<summary>Output</summary><br>

```
> package@0.0.8 preinstall
> echo '[TEST-LOG] preinstall'

[TEST-LOG] preinstall

> package@0.0.8 install
> echo '[TEST-LOG] install'

[TEST-LOG] install

> package@0.0.8 postinstall
> echo '[TEST-LOG] postinstall'

[TEST-LOG] postinstall

> dependencies
> echo '[TEST-LOG] dependencies'

[TEST-LOG] dependencies

added 1 package in 220ms
```
</details>

<!-- behavior:end -->
