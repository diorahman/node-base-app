## Easy profiling
 
To use the tick profiler, we will assume that we've deployed our application and users are complaining about high latency on requests. We can easily run the app with the built in profiler:

```
node --prof app.js
```
 
and put some load on the server using ab:

``` 
curl -X GET "http://localhost:8080"
ab -k -c 20 -n 250 "http://localhost:8080"
```
 
and get an ab output of:
 
```
Concurrency Level:      20
Time taken for tests:   46.932 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    5.33 [#/sec] (mean)
Time per request:       3754.556 [ms] (mean)
Time per request:       187.728 [ms] (mean, across all concurrent requests)
Transfer rate:          1.05 [Kbytes/sec] received

...
 
Percentage of the requests served within a certain time (ms)
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (longest request)
```
 
From this output, we see that we're only managing to serve about 5 requests per second and that the average request takes just under 4 seconds round trip. In a real world example, we could be doing lots of work in many functions on behalf of a user request but even in our simple example, time could be lost compiling regular expressions, generating random salts, generating unique hashes from user passwords, or inside the Express framework itself.
 
Since we ran our application using the --prof option, a tick file was generated in the same directory as your local run of the application. It should have the form isolate-0x124353456789-v8.log. In order to make sense of this file, we need to use the tick processor included at tools/v8-prof/tick-processor.js. _Note that we can't use the tick processor if our application is still running._

```
node tools/v8-prof/tick-processor.js isolate-0x101804c00-v8.log > processed.log
```
 
Opening processed.log in your favorite text editor will give you a few different types of information. The file is broken up into sections which are again broken up by language.
  
Hopefully, through the performance investigation of this (admittedly contrived) example, you've seen how the V8 tick processor can help you gain a better understanding of the performance of your Node.js applications.
