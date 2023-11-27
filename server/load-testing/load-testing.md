# Running JMeter load testing

1. install JMeter from [here](https://jmeter.apache.org/download_jmeter.cgi)
   1. Notice that for Macs there may be a different installation process, these links are primarily for linux/windows
2. Ensure that the app's server is running on port 7005 (default port on command docker compose up)
3. Open `load-testing.jmx` with JMeter
4. Click the green arrow or run
5. Review the tests in the 3 bottom options
   1. View result tree
   2. Summary Report
   3. Aggregate Report

<img title=JMeter alt='picture of JMeter results running on Spendr' src=JMeter.PNG>
