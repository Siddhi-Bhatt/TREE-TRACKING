import pandas as pd
from collections import Counter
log_data = pd.read_csv("path_to_log.csv")
print(log_data['Source_IP'])
a=log_data['Source_IP']
f = Counter(a)
print(f)
ip_addresses = log_data['Source_IP']
urls = log_data['URL']
ip_count = Counter(ip_addresses)
url_count = Counter(urls)
print("\nIP Address Activity:")
for ip, count in ip_count.items():
    print(f"{ip}: {count} times")

print("\nURL Access Frequency:")
for url, count in url_count.items():
    print(f"{url}: {count} times")
suspicious_ips = [ip for ip, count in ip_count.items() if count > 2]
if suspicious_ips:
    print("\nSuspicious Activity Detected from the following IP addresses:")
    for ip in suspicious_ips:
        print(f"Suspicious IP: {ip}")
suspicious_ip = '192.168.0.24'
suspicious_logs = log_data[log_data['Source_IP'] == suspicious_ip]
print(f"\nLogs associated with suspicious IP {suspicious_ip}:")
print(suspicious_logs)
suspicious_urls = suspicious_logs['URL'].value_counts()
print(f"\nSuspicious URLs accessed by IP {suspicious_ip}:")
for url, count in suspicious_urls.items():
    print(f"{url}: {count} times")