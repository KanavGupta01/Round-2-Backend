# Things to consider in this solution

This is a pretty basic solution to the problem defined in PROBLEM_STATEMENT.md file. Here are some things I could have done better if this were a production API:

1. Limit the size of uploaded file\
So multer allows us to limit the size of file uploads. This is helpful to prevent out of memory errors. The limit in this case could have been a generous 100MB (can be more or less depending on what type of files we are expecting ex. Image, CSVs, Videos etc)

2. Using DiskStorage instead  of MemoryStorage\
Here I have used the MemoryStorage configuration for multer to make things easier for me. The difference between Disk and Memory storage is that multer will temporarily store the file in memory with my configuration or else it stores to the default temp directory of the OS. Using DiskStorage is better as it again prevents out of memory errors and keeps the memory free for other business logic

3. Scaling the processing\
So let's say that hypothetically we want to append Rs and 2s to millions of files every second. We could handle that by first creating a cluster of node process which share the same http port (1337 in this example). This helps to prevent connection timeout and other http related congestion errors. The cluster functionality is provided in-built with the nodejs culster module.

Next step would be to create worker threads and offload the actual appending job to the workers so that our main thread and event loop don't get blocked and other routes in our application keep functioning with minimal latency.

Another apporach could be to return a job ID and close the tcp connection for the POST request. This can be helpful in improving performance as keeping connections open is costly. The client can then keep quering another endpoint about the status of the job using the ID we provided.

That's all from my side. Thanks for reading.