
another-simple-hello-world.jsx : another-simple-hello-world.js
	mv $< $@

.INTERMEDIATE: another-simple-hello-world.js
another-simple-hello-world.js : another-simple-hello-world.ts
	tsc --target ES3 $<

clean :
	$(RM) another-simple-hello-world.jsx
